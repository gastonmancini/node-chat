var mongoose = require('mongoose');
var ChatLine = mongoose.model("ChatLine");

/**
 * Creates a new chat line
 */
exports.createChatLine = function (chatRoom, nickName, message) {

	var chatLine = new ChatLine();
	chatLine.chatRoom = chatRoom;
	chatLine.nickName = nickName;
	chatLine.message = message;
	chatLine.serverDateTime = new Date().toISOString();

	chatLine.save(function (err) {
		if (err) throw err;
		// console.log('ChatLine saved.');
	});
};

/**
 * Retrieves the chat history for a given chatroom
 */
exports.findChatLinesByChatRoom = function (chatRoom, callback) {
	return ChatLine.find({ 'chatRoom': chatRoom }, callback);
};

/**
 * Retrieves a list of the chatrooms that has chat history
 */
exports.findChatRooms = function (callback) {
	return ChatLine.find().distinct('chatRoom', callback);
};