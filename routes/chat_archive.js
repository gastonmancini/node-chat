var chatArchive = require('../lib/chat_archive');

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