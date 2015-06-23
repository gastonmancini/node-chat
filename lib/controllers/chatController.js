module.exports = function (app, auth, chatService) {
	
	'use strict';
	
	// Retrieve the chat lines of a given chatroom
	app.get('/api/history/:room', auth.verifySignature, chatService.getChatLines);
	
	// Retrieve a list of the chatrooms that has logs
	app.get('/api/chatroom', auth.verifySignature, chatService.getChatRooms);

};