var userService = require('../services/userService');

module.exports = function (app) {

	// Register users
	app.post('/api/users', userService.registerUser);
	
}; 