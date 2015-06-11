var auth = require('../foundation/auth');
var userService = require('../services/userService');

module.exports = function (app) {

	// Register users
	app.post('/users', userService.registerUser);
	
	// Retrieve the authenticated user
	app.get('/auth', auth.ensureAuthenticated, auth.session);
	
	// Login user
	app.post('/auth', auth.login);
	
	// Logout user
	app.delete('/auth', auth.logout);

};