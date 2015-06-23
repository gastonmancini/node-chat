module.exports = function (app, auth) {
	
	'use strict';
	
	// Login user - Check name and password against the database and provide a token if authentication is successful.
	app.post('/api/authenticate', auth.authenticate);
	
};