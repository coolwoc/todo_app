var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db_todoApi');

// create instance
var mongoSchema = mongoose.Schema;

// create schema
var userSchema = {
	
	'id' : Number,
	'username' : String,
	'firstname' : String,
	'lastname' : String,
	'password' : String,
	'email': String,
	'role' : String

};

// create model if not exist.
module.exports = mongoose.model('user_login', userSchema);