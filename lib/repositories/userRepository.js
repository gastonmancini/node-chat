var mongoose = require('mongoose');

var User = require('../models/user');

/**
 * Creates a new user
 */
exports.create = function (username, email, password, callback) {

	var user = new User();
	user.username = username;
	user.email = email;
	user.password = password;

	user.save(callback);
};
