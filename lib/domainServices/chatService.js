module.exports = function (chatRepository) {
	
	'use strict';
	
	return {
		
		/**
		 * Retrieve the chat history for a given chatroom
		 * requires: { room }
		 * returns: { chatHistory }
		 */
		getChatLines: function (req, res) {
			
			var roomName = req.params.room; 
	
			if (!roomName) {
				res.send(404).json({ message: 'ChatRoom not found.'});
			}
			
			chatRepository.findChatLinesByChatRoom(roomName, function(err, chatLines) {		
				if (err) { 
					res.send(500).json({ message: 'There was an error processing your request.'}); 
				}		
				res.setHeader('Content-Type', 'application/json');		
				res.end(JSON.stringify(chatLines));
			});
					
		},
		
		/**
		 * Retrieve a list of chatRooms
		 * requires: { }
		 * returns: { chatRoomList }
		 */
		getChatRooms: function(req, res){
	
			chatRepository.findChatRooms(function(err, chatRooms) {		
				if (err) { 
					res.send(500).json({ message: 'There was an error processing your request.'});
				}		
				res.setHeader('Content-Type', 'application/json');		
				res.end(JSON.stringify(chatRooms));
			});
		}
			
	};
	
};