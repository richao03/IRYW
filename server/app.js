let Sequelize = require('sequelize')

let connection = new Sequelize ('IRYW','postgres','drowssap',{
	host:'localhost',
	dialect:'postgres'
})

const users = connection.define('user', {
	username:{
		type:Sequelize.STRING
	}, 
	email:Sequelize.STRING,
	password:Sequelize.STRING
});

connection.sync()
.then(function(){
	users.create({
		username:"richard",
		email:"rich@yahoo.com",
		password:"dragon"
	})
}); 

const getUserbyUserName = function (username, callback){
	let query = { username:username};
	users.findOne(query, callback)
}

const comparePassword = function (candidatePassword, hash, callback){
	var bcrypt = require('bcryptjs');
bcrypt.comparte(candidatePassword,hash, function (err, matched){
	if(err)throw err
		console.log("%%%%%%%%%%%%%%%%%%%", matched)
		callback(null,matched)
})


}

export {users, getUserbyUserName, comparePassword}