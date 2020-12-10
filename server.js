//import packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const helmet = require('helmet');
const cors = require("cors");
app.use(cors());
app.use(helmet());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const jwt = require ( 'jsonwebtoken' );
const port = 8000;

app.use(bodyParser.json())

//import routes
require('./routes/FindUser.js')(app);
require('./routes/PostReview.js')(app);
require('./routes/GetAll.js')(app);
require('./routes/CreateUser.js')(app);
require('./routes/GetMyReviews.js')(app);
require('./routes/DeleteReview.js')(app);
require('./routes/GetReview.js')(app);
require('./routes/UpdateReview.js')(app);
require('./routes/SearchReviews.js')(app);
require('./routes/SearchMyReviews.js')(app);
require('./routes/AdminSearch.js')(app);
require('./routes/UpdateUser.js')(app);


//mongodb connection string to connect express to db .
const uri = process.env.MongoDB_Connection;

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
	useMongoClient: true
});


//if failed to connect return error message else tell user connection successful
mongoose.connection.on('error', function() {
	console.log('Connection to Mongo established.');
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})



//used to get token
app.get( '/getToken' , (req, res) => {

	payload = {'username' : req.body.username , 'admin' : req.body.admin };

	const token = jwt.sign( JSON .stringify(payload), 'jwt-secret' ,
	{algorithm: 'HS256' })
	res.send({ 'token' : token})

})

const path = require('path');

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('review_app/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'review_app', 'build', 'index.html'));
	});
}


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});