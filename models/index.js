const mongoose = require('mongoose')

const db = {}
db.mongoose = mongoose
db.User = require('./user');
db.Log = require('./log');
module.exports = db;
