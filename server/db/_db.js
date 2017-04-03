let path = require('path');
let Sequelize = require('sequelize');

let env = require(path.join(__dirname, '../env'));
let db = new Sequelize(env.DATABASE_URI, { logging: env.LOGGING });

module.exports = db;
