'use strict';

var should = require('should');
var sinon = require('sinon');
var nodechat = require('./../../server');
var User = nodechat.models.User;
var userRepository = nodechat.repositories.userRepository;
var encryption = nodechat.foundation.encryption;

describe('Repositories: UserRepository', function () {

	var user = { user: { email: 'email@test.com', username: 'username', password: 'password', verified: true, verificationToken: 'verificationToken' } };

	before(function (done) {

		sinon.stub(encryption, 'encrypt', function (obj) {
			return obj;
		});

		sinon.stub(User, 'findOne', function () {
			return user;
		});

		done();

	});

	it('should retrieve an user by email', function () {

		var userRetrieved = userRepository.findByEmail('email@test.com', function () { });

		userRetrieved.should.eql(user);

	});


	it('should retrieve an user by id', function () {

		var userRetrieved = userRepository.findById(1, function () { });

		userRetrieved.should.eql(user);

	});

	it('should retrieve an user by username', function () {

		var userRetrieved = userRepository.findByUsername('username', function () { });

		userRetrieved.should.eql(user);

	});

	it('should create and save a user', function () {
		
		/**
		 * TODO: Mongoose save method is generated dynamically, is not defined in the model. 
		 * So we have to find a workaround for mocking it.
		 */
	});
});