/**
 * 400 - Bad request response
 */
exports.send400 = function send400(response) {
	response.writeHead(400, {'Content-Type': 'text/plain'});
	response.write('Error 400: Bad request.');
	response.end();
};

/**
 * 403 - Forbidden response
 */
exports.send403 = function send403(response) {
	response.writeHead(403, {'Content-Type': 'text/plain'});
	response.write('Error 403: Forbidden.');
	response.end();
};

/**
 * 404 - Not found response
 */
exports.send404 = function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: Resource not found.');
	response.end();
};

/**
 * 500 - Internal server error response
 */
exports.send500 = function send500(response) {
	response.writeHead(500, {'Content-Type': 'text/plain'});
	response.write('Error 500: Internal Server Error.');
	response.end();
};