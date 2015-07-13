module.exports = function (chatRepository, logger) {

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
				logger.warning('Bad request. The room name is not set in the request params.');
				return res.send(400).json({ message: 'Bad request.' });
			}

			chatRepository.findChatLinesByChatRoom(roomName, function (err, chatLines) {
				if (err) {
					logger.error('An error ocurred retrieving the chat history for the given chatroom. Chatroom: ' + roomName);
					return res.send(500).json({ message: 'There was an error processing your request.' });
				}
				res.setHeader('Content-Type', 'application/json');
				
				logger.debug('Chat lines successfully retrieved.');
				return res.end(JSON.stringify(chatLines));
			});

		},
		
		/**
		 * Retrieve a list of chatRooms
		 * requires: { }
		 * returns: { chatRoomList }
		 */
		getChatRooms: function (req, res) {

			chatRepository.findChatRooms(function (err, chatRooms) {
				if (err) {
					logger.error('An error ocurred retrieving the chatrooms');
					return res.send(500).json({ message: 'There was an error processing your request.' });
				}
				res.setHeader('Content-Type', 'application/json');
				
				logger.debug('Chatrooms successfully retrieved.');
				return res.end(JSON.stringify(chatRooms));
			});
		}

	};

};