var auth = require('../foundation/auth');
var chatService = require('../services/chatService');

module.exports = function (app) {
	
	// Retrieve the chat lines of a given chatroom
	app.get('/api/history/:room', auth.ensureAuthenticated, chatService.getChatLines);
	
	// Retrieve a list of the chatrooms that has logs
	app.get('/api/chatroom', auth.ensureAuthenticated, chatService.getChatRooms);

};