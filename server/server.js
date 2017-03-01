let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let app = express();
let pg = require('pg');

const PORT = 3001;

let pool = new pg.Pool({
    port: 5432,
    password: 'drowssap',
    database: 'IRYW',
    host: 'localhost',
    user: 'postgres'
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware
app.use(morgan('dev'))



//allow CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    next()
});

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
                    console.log(")(*)(*)(*)(*)(*)(*)(*","data updated")
                    res.status(201).send({msg:"data updated"})
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
app.listen(PORT, () => console.log("magic at port  " + PORT))
