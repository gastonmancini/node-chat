module.exports = function (app, userService) {

	// Register users
	app.post('/api/users', userService.registerUser);
	
}; 