var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var config = require('./lib/config/config');
var mongo = require('./lib/models/bootstrap');
var chatService = require('./lib/services/chatService');
var userService = require('./lib/services/userService');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// Configure express
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(expressSession({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));

// Middleware to parse the JSON body configure app to use bodyParser() this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use passport session
app.use(passport.initialize());
app.use(passport.session());

var auth = require('./lib/foundation/auth');

// API auth
app.post('/users', userService.registerUser);
app.get('/auth', auth.ensureAuthenticated, auth.session);
app.post('/auth', auth.login);
app.delete('/auth', auth.logout);
  
// API chatroom history endpoints
app.get('/api/history/:room', auth.ensureAuthenticated, chatService.getChatLines);
app.get('/api/chatroom', auth.ensureAuthenticated, chatService.getChatRooms);

http.listen(config.port, function () {
	console.log('Listening port:' + config.port);
});

/**
 * Load custom Node functionality, and
 * Starts the socket.io server functionality (provide  the server so it can share the same tcp/ip port)
 */
var chatServer = require('./lib/chatServer');
chatServer.listen(http);

