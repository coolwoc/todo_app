var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db_todoApi');

// create instance
var mongoSchema = mongoose.Schema;

// create schema
var userSchema = {
	'username' : String,
	'password' : String
};

// create model if not exist.
module.exports = mongoose.model('user_login', userSchema);