module.exports = function (app, userService) {

	'use strict';

	// Register users
	app.post('/api/users', userService.registerUser);
	
	// Verify account
	app.get('/api/users/:userId/verify/:verificationToken', userService.verifyAccount);

}; 