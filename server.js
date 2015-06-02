var express = require('express');
var app = express();
var http = require('http').Server(app);
var common = require('./lib/foundation/common');
var chatService = require('./lib/services/chatService');

// Serve static assets
app.use(express.static(__dirname + '/public'));

// Set views and template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Chat Main UI
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// Chatroom history
app.get('/history/:room', chatService.list);

// API chatroom histpry endpoints
app.get('/api/history/:room', chatService.listAsJson);

http.listen(common.listenPort(), function () {
	console.log('Listening...');
});

/**
 * Load custom Node functionality, and
 * Starts the socket.io server functionality (provide  the server so it can share the same tcp/ip port)
 */
var chatServer = require('./lib/chatServer');
chatServer.listen(http);

