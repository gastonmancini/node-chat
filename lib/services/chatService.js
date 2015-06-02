var chatRepository = require('../repositories/chatRepository');
var errorHandler = require('../foundation/errorHandler');

exports.list = function(req, res, next){
	
	var roomName = req.params.room; 
	
	chatRepository.getChatLines(roomName, function(err, chatLines) {		
		if (err) { 
			errorHandler.send500(res); 
		}				
		res.render('chatRoomHistory', {
			title: 'Chat History',
			roomName: roomName,
			chatLines: chatLines
		});	
	});	
};

exports.listAsJson =  function(req, res){
	
	var roomName = req.params.room; 
	
	if (!roomName) {
		errorHandler.send404(res);
	}
	
	chatRepository.getChatLines(roomName, function(err, chatLines) {		
		if (err) { 
			errorHandler.send500(res); 
		}		
		res.setHeader('Content-Type', 'application/json');		
		res.end(JSON.stringify(chatLines));
	});
	
}