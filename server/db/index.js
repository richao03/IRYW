'use strict';
let db = require('./_db');
module.exports = db;

let users = require('./models/users');
let issues = require('./models/issues');


// Cascade feature is to delete entries in the pages
// tables if an item is deleted from the projects table.


