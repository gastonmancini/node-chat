var chatRepository = require('../repositories/chatRepository');
var errorHandler = require('../foundation/errorHandler');

exports.getChatLines =  function(req, res){
	
	var roomName = req.params.room; 
	
	if (!roomName) {
		errorHandler.send404(res);
	}
	
	chatRepository.findChatLinesByChatRoom(roomName, function(err, chatLines) {		
		if (err) { 
			errorHandler.send500(res); 
		}		
		res.setHeader('Content-Type', 'application/json');		
		res.end(JSON.stringify(chatLines));
	});
	
}

exports.getChatRooms = function(req, res){
	
	chatRepository.findChatRooms(function(err, chatRooms) {		
		if (err) { 
			errorHandler.send500(res); 
		}		
		res.setHeader('Content-Type', 'application/json');		
		res.end(JSON.stringify(chatRooms));
	});
	
}