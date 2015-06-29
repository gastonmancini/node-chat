'use strict';

var should = require('should');
var sinon = require('sinon');
var nodechat = require('./../../server');
var ChatLine = nodechat.models.ChatLine;
var chatRepository = nodechat.repositories.chatRepository;

describe('Repositories: ChatRepository', function () {

	var chatLine = { chatRoom: 'chatRoom', nickName: 'nickName', message: 'message', serverDateTime: new Date().toISOString() };
	var chatRooms = ['chatRoom1', 'chatRoom2'];

	before(function (done) {

		sinon.stub(ChatLine, 'find', function () {
			return chatLine;
		});

		done();

	});

	it('should retrieve the chat lines for a given chatroom', function () {

		var chatLinesRetrieved = chatRepository.findChatLinesByChatRoom('chatRoom',(function (cb) { cb(null); }));

		chatLinesRetrieved.should.eql(chatLine);

	});

	it('should create and save a chatLine', function () {
		
		/**
		 * TODO: Mongoose save method is generated dynamically, is not defined in the model. 
		 * So we have to find a workaround for mocking it.
		 */
	});

});