var mongoose = require('mongoose');
var config = require('./config/config');

// Connect to mongoDb
var db = mongoose.connect(config.db, function (err) {
  if (err) {
    console.log ('Error connecting to the database' + config.db + '. Error: ' + err);
  } 
});

// Register the entities...
var User = require('./models/user');
var ChatLine = require('./models/chatLine');

// Register controllers
module.exports = function(app) {
  require('./controllers/authController')(app);
  require('./controllers/chatController')(app);
}