'use strict';

// get packages.

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./models/user');

// configuration
var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

// body parser POST / URL
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log
app.use(morgan('dev'));

// basic Route
app.get('/', function(req, res) {
	res.send('Api running! http://localhost:' + port + '/api');
});

app.get('/setup', function(req, res) {

	var nick = new User({
		name: 'Nick',
		password: 'password',
		admin: true
	});

	// save the sample
	nick.save(function(err) {

		if (err) throw err;

		console.log('user saved succesfully!');
		res.json({ success: true });

	});

});

// API basic setUp
var apiRoutes = express.Router();

apiRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to todo-app API' });
});

apiRoutes.get('/users', function(req, res) {

	User.find({}, function(err, users) {
		res.json(users);
	});

});

app.use('/api', apiRoutes);

// API ROUTES
var apiRoutes = express.Router();

// route authentication user
// POST http://localhost:8080/api/authenticate

apiRoutes.post('/authenticate', function(req, res) {

	User.findOne({

		name: req.body.name

	}, function (err, user) {

		if(err) throw err;

		if(!user) {

			console.log('nopeUser!');

			res.json({ success: false, message: 'Authentication failed. User not found.' })

		} else if (user) {

			console.log('yeapUser!');

			if (user.password != req.body.password) {

				res.json({ success: false, message: 'Authentication failed. Wrong password' });

			} else {

				// if user is found and password match.
				// create token for authentication

				//var temp = {name:user.name, password:user.password}
				var token = jwt.sign(user, app.get('superScret'), {

					expiresInMinutes: 1440 // expires in 24hrs.

				});

				// return information including token as JSON.

				res.json({
					success: true,
					message: 'we done it!',
					token: token
				});
			}
		}
	});
});

// server starts.
app.listen(port);
console.log('Magic happens always!');