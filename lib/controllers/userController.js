module.exports = function (app, userService) {

	'use strict';

	// Register users
	app.post('/api/users', userService.registerUser);
	
}; 