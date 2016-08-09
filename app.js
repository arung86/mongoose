var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var app = express();

// configuration ===============================================================

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');

// DEFINE MODEL
var Book = require('./models/book');

app.set('port', process.env.PORT || 3000);

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure Router
var router = require('./routes')(app, Book);

// launch ======================================================================
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});