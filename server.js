var express = require('express');
var app = express();
var http = require('http').Server(app);

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

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

/*
app.get('/archive', function(req, res){
	console.log("test");
});*/

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});

/**
 * Load custom Node functionality, and
 * Starts the socket.io server functionality (provide  the server so it can share the same tcp/ip port)
 */
var chatServer = require('./lib/chat_server');
chatServer.listen(http);

