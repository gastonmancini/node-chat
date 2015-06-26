'use strict';

var should = require('should');
var sinon = require('sinon');
var nodechat = require('./../../server');
var bCrypt = nodechat.dependencies.bCrypt;
var encryption = nodechat.foundation.encryption;

describe('Foundation: Encryption', function () {
	
	var encryptedObject = 'encryptedObject';
	
	before(function(done) {
		
		sinon.stub(bCrypt, 'hashSync', function () {
			return encryptedObject;
		});
		
		sinon.stub(bCrypt, 'genSaltSync', function () {
			return 'dummySalt';
		});
		
		sinon.stub(bCrypt, 'compareSync', function (obj1, obj2) {
			return obj1 === obj2;
		});
		
		done();
		
	});
	
	it('should successfully encrypt an object', function () {
		
		var encryptedObjectResult = encryption.encrypt("decrypted");
		
		encryptedObjectResult.should.eql(encryptedObject);
		
	});
	
	it('should return true comparing two encrypted objects', function () {
		
		var compareResult = encryption.compare(encryptedObject, encryptedObject);
		
		compareResult.should.eql(true);
		
	});
	
	it('should return false comparing two encrypted objects', function () {
		
		var anotherEncryptedObject = 'anotherEncryptedObject';
		
		var compareResult = encryption.compare(encryptedObject, anotherEncryptedObject);
		
		compareResult.should.eql(false);
		
	});
	
});