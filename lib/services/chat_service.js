var chatArchive = require('../repositories/chat_repository');

exports.list = function(req, res, next){
	
	var roomName = req.params.room; 
	
	chatArchive.getChatLines(roomName, function(err, chatLines) {		
		if (err) { 
			return next(err);
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
		send404(res);
	}
	
	chatArchive.getChatLines(roomName, function(err, chatLines) {		
		if (err) { 
			send500(res); 
		}		
		res.setHeader('Content-Type', 'application/json');		
		res.end(JSON.stringify(chatLines));
	});
	
}