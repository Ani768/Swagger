onst mongoose = require('mongoose')

const db = {}
db.mongoose = mongoose
db.User = require('./user').User;
db.Log = require('./log');
module.exports = db;
