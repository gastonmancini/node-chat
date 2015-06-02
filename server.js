var express = require('express');
var app = express();
var http = require('http').Server(app);
var common = require('./lib/foundation/common');
var chatService = require('./lib/services/chat_service');

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
 * Set views and template engine
 */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/**
 * Chat endpoint
 */
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

/**
 * Chat history for room View (render html)
 */
app.get('/archive/:room', chatService.list);


/**
 * Chat history for room API (returns json)
 */
app.get('/api/archive/:room', chatService.listAsJson);

http.listen(common.listenPort(), function () {
	console.log('Listening...');
});

/**
 * Load custom Node functionality, and
 * Starts the socket.io server functionality (provide  the server so it can share the same tcp/ip port)
 */
var chatServer = require('./lib/chat_server');
chatServer.listen(http);

