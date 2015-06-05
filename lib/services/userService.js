var userRepository = require('../repositories/userRepository');
var errorHandler = require('../foundation/errorHandler');

/**
 * Register a new user
 */
exports.createUser = function (req, res) {

	if (!req.body.user) {
		errorHandler.send500(res);
	}

	var username = req.body.user.username;
	var email = req.body.user.email;
	var password = req.body.user.password;

	if (!username || !email || !password) {
		errorHandler.send500(res);
	}

	userRepository.create(username, email, password, function (err) {

		if (err) {
			errorHandler.send500(res);
		}
		
		res.setHeader('Content-Type', 'application/json');
		res.end();
		
	});

};