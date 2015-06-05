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

/**
 * Retrieves a user by email
 */
exports.findByEmail = function (email, callback) {
	return User.findOne({ 'email': email }, callback);
};

/**
 * Retrieves a user by id
 */
exports.findById = function (id, callback) {
	return User.findOne({ '_id': id }, callback);
};

/**
 * Retrieves a user by username
 */
exports.findByUsername = function (username, callback) {
	return User.findOne({ 'username': username }, callback);
};