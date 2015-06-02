/**
 * 404 response
 */
exports.send404 = function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}

/**
 * 500 response
 */
exports.send500 = function send500(response) {
	response.writeHead(500, {'Content-Type': 'text/plain'});
	response.write('Error 500: Internal Server Error.');
	response.end();
}