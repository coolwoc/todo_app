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

app.use( '/', router );
app.listen(3009);
console.log('Listening to PORT 3009');