var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var config = require('./lib/config/config');
var chatService = require('./lib/services/chatService');
var userService = require('./lib/services/userService');
var auth = require('./lib/foundation/auth');

// Middleware to parse the JSON body configure app to use bodyParser() this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static assets
app.use(express.static(__dirname + '/public'));

// Register a user
app.get('/register', function(req, res){
	res.sendFile(__dirname + '/public/register.html');
});
// User authentication
app.get('/login', function(req, res){
	res.sendFile(__dirname + '/public/login.html');
})
app.post('/users', userService.registerUser);
app.get('/auth', auth.ensureAuthenticated, auth.session);
app.post('/auth', auth.login);
app.delete('/auth', auth.logout);
  
// Chatroom history
app.get('/history', function(req, res){
	res.sendFile(__dirname + '/public/chatRoomHistory.html');
});

// API chatroom history endpoints
app.get('/api/history/:room', chatService.getChatLines);
app.get('/api/chatroom', chatService.getChatRooms);

http.listen(config.port, function () {
	console.log('Listening port:' + config.port);
});

/**
 * Load custom Node functionality, and
 * Starts the socket.io server functionality (provide  the server so it can share the same tcp/ip port)
 */
var chatServer = require('./lib/chatServer');
chatServer.listen(http);

