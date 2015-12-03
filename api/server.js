var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoOp = require('./models/mongo');
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended' : false }));

router.get('/', function ( req, res ) {
	res.json({ 'error': false, 'message' : 'up and running!' });
});

router.route('/users')
	.get(function (req, res) {

		var response = {};

		mongoOp.find({}, function (err, data) {

			if (err) {

				response = {'error' : true, 'message' : 'Error fetching data'};

			} else {

				response = {'error': false, 'message' : data};
			}

			res.json(response);

		});
	})
	.post( function (req, res) {

		var db = new mongoOp();
		var response = {};

		// fech username and password from REST request
		// add strict validation whe  you use this in production

		db.username = req.body.username;
		// Hass the password using SHA1 algorithm.
		db.userPassword = require('crypto')
							.createHash('sha1')
							.update(req.body.password)
							.digest('base64');

		db.save( function (err) {
			// save() will run insert() command in MongoDB
			// it will add new data in collection
			if(err) {
				response = { 'error' : true, 'message' : 'Error adding data' };
			} else {
				response = { 'error' : false, 'message' : 'Data added' };
			}
			res.json(response);
		});
	})

router.route('/users/:id')
	.get(function ( req, res ) {

		var response = {};

		mongoOp.findById(req.params.id, function ( err, data ) {

			//This will run Mongo Query to fetch Data.
			if(err) {
				response = { 'error' : true, 'message' : 'Error fetching data'};
			} else {
				response = { 'error' : false, 'message' : data };
			}

			res.json(response);

		});
	})
	.put(function ( req, res ) {

		var response = {};

		// first find if record exist.
		// if it does then update record

		mongoOp.findById( req.params.id, function (err, data) {

			if (err) {

				response = {'error' : true, 'message' : 'Error fetching data!'};
			} else {

				if (req.body.username != undefined ) {
					// case username needs to be updated.
					data.username = req.body.username;
				}
				if ( req.body.userPassword != undefined ) {
					//case where password needs to be updated.
					data.userPassword = req.body.password;
				}
				// save the data
				data.save (function (err) {

					if (err) {

						response = {'error': true, 'message' : 'Error updatubg data!'};

					} else {

						response = {'error': false, 'message' : 'Data is updated for ' + req.params.id};

					}
					res.json(response);
				})
			}

		});
	})

app.use( '/', router );
app.listen(3004);
console.log('Listening to PORT 3004');


/** Terminal setUp for app

	mongod --dbpath /Users/Shahid/Desktop/mongoData

	new tab. Run:
	mongo


	dataBase -- db_todoApi

	run node with:
	npm start


**/