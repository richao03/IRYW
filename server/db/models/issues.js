var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('issues', {
    headline: {
        type: Sequelize.TEXT
    },
    male_details: {
        type: Sequelize.TEXT
    },
    female_details: {
        type: Sequelize.TEXT
    },
    male_main: {
        type: Sequelize.TEXT
    },
    female_main: {
        type: Sequelize.TEXT
    },
    male_vote: {
        type: Sequelize.INTEGER
    },
    female_vote: {
        type: Sequelize.INTEGER
    }
})