module.exports = function (mongoose, ChatLine) {
	
	return {
		
		/**
		 * Creates a new chat line
		 */
		createChatLine: function (chatRoom, nickName, message, callback) {
		
			var chatLine = new ChatLine();
			chatLine.chatRoom = chatRoom;
			chatLine.nickName = nickName;
			chatLine.message = message;
			chatLine.serverDateTime = new Date().toISOString();
		
			chatLine.save(callback);
		},
		
		/**
		 * Retrieves the chat history for a given chatroom
		 */
		findChatLinesByChatRoom: function (chatRoom, callback) {
			return ChatLine.find({ 'chatRoom': chatRoom }, callback);
		},
		
		/**
		 * Retrieves a list of the chatrooms that has chat history
		 */
		findChatRooms: function (callback) {
			return ChatLine.find().distinct('chatRoom', callback);
		}
	};

};