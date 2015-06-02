var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017/chathistory');

var ChatLine = require('./models/chat_line');

/**
 * Creates a new chat line
 */
exports.addChatLine = function (chatRoom, nickName, message) {

	var chatLine = new ChatLine();
	chatLine.chatRoom = chatRoom;
	chatLine.nickName = nickName;
	chatLine.message = message;
	chatLine.serverDateTime = new Date().toISOString();

	chatLine.save(function (err) {
		if (err) throw err;
		console.log('ChatLine saved.');
	});
};

/**
 * Retrieves the chat history for a given chatroom
 */
exports.getChatLines = function (chatRoom, callback) {
	return ChatLine.find({ 'chatRoom': chatRoom }, callback);
};

/**
 * Retrieves a list of the chatrooms that has chat history
 */
exports.getChatRooms = function (chatRoom) {
	return ChatLine.distinct('chatRoom', { 'chatRoom': chatRoom }, function (err, chatLines) {
		if (err) throw err;
	}).Select({ "chatRoom": 1, "_id": 0, "nickName": 0, "message": 0, "serverDateTime": 0 });
};