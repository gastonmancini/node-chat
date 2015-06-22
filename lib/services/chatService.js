var chatRepository = require('../repositories/chatRepository');

exports.getChatLines =  function(req, res){
	
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
	
};

exports.getChatRooms = function(req, res){
	
	chatRepository.findChatRooms(function(err, chatRooms) {		
		if (err) { 
			res.send(500).json({ message: 'There was an error processing your request.'});
		}		
		res.setHeader('Content-Type', 'application/json');		
		res.end(JSON.stringify(chatRooms));
	});
	
};