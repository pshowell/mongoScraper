// Node Dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var request = require('request'); // for web-scraping
var cheerio = require('cheerio'); // for web-scraping


// Initialize Express for debugging & body parsing
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}))

// Serve Static Content
app.use(express.static(process.cwd() + '/public'));

// Express-Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Database Configuration with Mongoose
// ---------------------------------------------------------------------------------------------------------------
// Connect to localhost if not a production environment
if(process.env.NODE_ENV == 'production'){
  mongoose.connect("mongodb://heroku_cdqfkfxm:sqeugkt85vsqf1j4om3q2v72mu@ds239047.mlab.com:39047/heroku_cdqfkfxm");
}
else{
  mongoose.connect("mongodb://heroku_cdqfkfxm:sqeugkt85vsqf1j4om3q2v72mu@ds239047.mlab.com:39047/heroku_cdqfkfxm");
}
var db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Import the Comment and Article models
var Comment = require('./models/Comment.js');
var Article = require('./models/Article.js');
// ---------------------------------------------------------------------------------------------------------------

// DROP DATABASE (FOR MY PERSONAL REFERENCE ONLY - YOU CAN IGNORE)
// Article.remove({}, function(err) {
//    console.log('collection removed')
// });

// Import Routes/Controller
var router = require('./controllers/controller.js');
app.use('/', router);


// Launch App
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});
