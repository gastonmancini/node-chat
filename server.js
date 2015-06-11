var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var config = require('./lib/config/config');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// Configure express
app.use(express.static(__dirname + '/public'));
app.use('/lib', express.static(__dirname + '/node_modules/'));
app.use(cookieParser());
app.use(expressSession({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));

// Middleware to parse the JSON body configure app to use bodyParser() this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use passport session
app.use(passport.initialize());
app.use(passport.session());

var bootstrapNode = require('./lib/bootstrap')(app);
  
http.listen(config.port, function () {
	console.log('Listening port:' + config.port);
});

/**
 * Load custom Node functionality, and
 * Starts the socket.io server functionality (provide  the server so it can share the same tcp/ip port)
 */
var chatServer = require('./lib/chatServer');
chatServer.listen(http);

