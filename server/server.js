let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
let session = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let cookieParser = require('cookie-parser');
let flash = require('connect-flash');
let expressValidator = require('express-validator');
let app = express();
let userDB = require('./app.js')

const PORT = (process.env.PORT || 3001);

let pool = new pg.Pool({
    port: 5432,
    password: 'drowssap',
    database: 'IRYW',
    host: 'localhost',
    user: 'postgres'
})


//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('dev'))
app.use(session({
    //need to hide secret
    secret: "secret",
    saveUninitialized: true,
    resave: true
}))


//passport init
app.use(passport.initialize());
app.use(passport.session())

//express validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//connect flash

app.use(flash());



//allow CORS
app.use(function(req, res, next) {
    // res.local.success_msg = req.flash('success_msg');
    // res.local.error_msg = req.flash('error_msg');
    // res.local.error = req.flash('error');
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    next()
});

//DATA

app.get('/api/issues', function(req, res) {
    pool.connect(function(err, db, done) {
        if (err) {
            return console.log(err)
        } else {
            db.query('SELECT * FROM issues', function(err, table) {
                if (err) {
                    return console.log(err)
                } else {
                    console.log(table.rows)

                    res.status(200).send(table.rows)
                }
            })
        }
    })
})

app.put('/api/issues/voted/:id', function(req, res) {
    const maleVote = req.body.maleVote;
    const femaleVote = req.body.femaleVote;
    const id = req.body.id;
    let values = [id, maleVote, femaleVote]
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            console.log("this is from backend line 61")
            db.query("UPDATE issues SET male_vote = male_vote+$2, female_vote = female_vote+$3  WHERE id=$1", [...values], function(err, table) {
                if (err) {
                    return console.log(err)
                } else {
                    done();
                    console.log(")(*)(*)(*)(*)(*)(*)(*", "data updated")
                    res.status(201).send({ msg: "data updated" })
                }
            })


        }
    })
})

app.post('/api/issue', function(req, res) {
    var headline = req.body.headline;
    var male_main = req.body.male_main;
    var female_main = req.body.female_main;
    var male_details = req.body.male_details;
    var female_details = req.body.female_details;
    let values = [headline, male_main, female_main, male_details, female_details]
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err)
        } else {
            db.query('INSERT INTO issues(headline, male_main, female_main, male_details, female_details ) VALUES ($1, $2,$3,$4,$5)', [...values], (err, table) => {
                if (err) {
                    return console.log(err)
                } else {
                    done()
                    res.status(201).send({ msg: "data submitted" })

                }
            })
        }
    })
})

//USER LOGIN


app.get('./api/users', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.hash;



    passport.use(new LocalStrategy(
        function(username, password, done) {
            userDB.getUserByUserName(username, function(err, user) {
                if (err) {
                    throw err
                }

                if (!user) {
                    return done(null, false, { msg: "unknown user" });
                }

                User.comparePassword(password, user.password, function(err, matched) {
                    if (err) {
                        throw err
                    }
                    if (matched) {
                        return done(null, user);
                    } else {
                        return done(null, false, { msg: "password is wrong" })
                    }
                })
            });
        }));

})

app.post('/login', passport.authenticate('local'))


app.post('/api/users', function(req, res) {
    var username = req.body.username;
    var password = req.body.hash;
    var email = req.body.email;
    let values = [username, password, email]
    pool.connect((err, db, done) => {
        if (err) {
            return console.log(err)
        } else {
            db.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [...values], (err, table) => {
                if (err) {
                    return console.log(err)
                } else {
                    done()
                    req.flash('success_msg', "YOU ARE LOGGED IN!!!")
                    res.status(201).send({ msg: "NEW USER CREATED" })
                }
            })
        }
    })
})
app.listen(PORT, () => console.log("magic at port  " + PORT))
