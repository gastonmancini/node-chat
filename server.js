var express = require('express');
var app = express();
var http = require('http').Server(app);
var chatArchive = require('./lib/chat_archive');
var common = require('./lib/foundation/common');

/**
 * 404 response
 */
function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}

/**
 * 500 response
 */
function send500(response) {
	response.writeHead(500, {'Content-Type': 'text/plain'});
	response.write('Error 500: Internal Server Error.');
	response.end();
}

/**
 * Serve static assets
 */
app.use(express.static(__dirname + '/public'));

/**
 * Chat endpoint
 */
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});


/**
 * Chat history for room 
 */
app.get('/archive/:room', function(req, res){
	
	var roomName = req.params.room; 
	
	if (!roomName) {
		send404(res);
	}
	
	chatArchive.getChatLines(roomName, function(err, chatLines) {
		
		if (err) { 
			send500(res); 
		}
		
		var lines = "";
		for (var i = 0; i < chatLines.length; i++) {
				lines = lines + " \n " + chatLines[i].toString();
		}
		
		res.end("------------------------------------------------------------" + "\n" +
				"------------------------Chat History------------------------" + "\n" +
				"------------------------------------------------------------" + "\n" +
				" Room  |       Created Time       |  Nick  |  Message " + "\n" +
		 		lines);
	});
	
});

http.listen(common.listenPort(), function () {
	console.log('Listening...');
});

/**
 * Load custom Node functionality, and
 * Starts the socket.io server functionality (provide  the server so it can share the same tcp/ip port)
 */
var chatServer = require('./lib/chat_server');
chatServer.listen(http);

