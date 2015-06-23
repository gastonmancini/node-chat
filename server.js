var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var morgan = require('morgan');

// Configure express
app.use(express.static(__dirname + '/public'));
app.use('/lib', express.static(__dirname + '/node_modules/'));

// Middleware to parse the JSON body configure app to use bodyParser() this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use morgan to log requests to the console
app.use(morgan('dev'));

// Bootstrap application
var nodechat = require('./lib/core/bootstrap')(app);
  
http.listen(nodechat.config.port, function () {
	console.log('Listening port:' + nodechat.config.port);
});

/**
 * Load custom Node functionality, and
 * Starts the socket.io server functionality (provide  the server so it can share the same tcp/ip port)
 */
nodechat.applicationServices.chatServer.listen(http);