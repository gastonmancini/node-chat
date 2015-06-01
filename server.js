var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

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
 * Retrieve a specific file
 */
function sendFile(response, filePath, fileContents) {
	response.writeHead(
	    200, 
	    {"content-type": mime.lookup(path.basename(filePath))}
	);
	response.end(fileContents);
}

/**
 * Serve a static file - from cache or disk
 */
function serveStatic(response, cache, absPath) {
	if (cache[absPath]) {
		sendFile(response, absPath, cache[absPath]);
	} else {
		fs.exists(absPath, function(exists) {
			if (exists) {
				fs.readFile(absPath, function(err, data) {
					if (err) {
						send500(response);		
					} else {
						cache[absPath] = data;	
						sendFile(response, absPath, data);
					}
				});
			} else {
				send404(response);
			}
		});
	}
}

/**
 * Create server
 */
var server = http.createServer(function(request, response) {
	var filePath = false;
	
	if (request.url == '/') {
		filePath = 'public/index.html';
	} else {
		filePath = 'public' + request.url;
	}
	
	var absPath = './' + filePath;
	serveStatic(response, cache, absPath);
});

server.listen(process.env.PORT || 3000, function(){
  console.log('listening on', server.address().port);
});

/**
 * Load custom Node functionality, and
 * Starts the socket.io server functionality (provide  the server so it can share the same tcp/ip port)
 */
var chatServer = require('./lib/chat_server');
chatServer.listen(server);

