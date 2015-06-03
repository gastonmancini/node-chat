var express = require('express');
var app = express();
var http = require('http').Server(app);
var common = require('./lib/foundation/common');
var chatService = require('./lib/services/chatService');

// Serve static assets
app.use(express.static(__dirname + '/public'));

// Chatroom history
app.get('/history', function(req, res){
	res.sendFile(__dirname + '/public/chatRoomHistory.html');
});

// API chatroom history endpoints
app.get('/api/history/:room', chatService.getChatLines);
app.get('/api/chatroom', chatService.getChatRooms);

http.listen(common.listenPort(), function () {
	console.log('Listening...');
});

/**
 * Load custom Node functionality, and
 * Starts the socket.io server functionality (provide  the server so it can share the same tcp/ip port)
 */
var chatServer = require('./lib/chatServer');
chatServer.listen(http);

