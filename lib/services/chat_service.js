var chatArchive = require('../repositories/chat_repository');
var errorHandler = require('../foundation/error_handler');

exports.list = function(req, res, next){
	
	var roomName = req.params.room; 
	
	chatArchive.getChatLines(roomName, function(err, chatLines) {		
		if (err) { 
			errorHandler.send500(res); 
		}				
		res.render('chat_archive', {
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
	
	chatArchive.getChatLines(roomName, function(err, chatLines) {		
		if (err) { 
			errorHandler.send500(res); 
		}		
		res.setHeader('Content-Type', 'application/json');		
		res.end(JSON.stringify(chatLines));
	});
	
}