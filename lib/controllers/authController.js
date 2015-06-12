var auth = require('../foundation/auth');

module.exports = function (app) {
	
	// Login user - Check name and password against the database and provide a token if authentication successful.
	// This route will not require a token because this is where we get the token
	app.post('/api/authenticate', auth.authenticate);
	
};