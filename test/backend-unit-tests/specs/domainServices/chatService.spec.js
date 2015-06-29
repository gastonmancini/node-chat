'use strict';

var should = require('should');
var sinon = require('sinon');
var nodechat = require('./../../server');
var ChatLine = nodechat.models.ChatLine;
var chatRepository = nodechat.repositories.chatRepository;
var chatService = nodechat.domainServices.chatService;

var sandbox;

describe('Services: ChatService', function () {

	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function () {
		sandbox.restore();
	});

	describe('Service: getChatLines', function () {

		it('should return an error if the chatroom was not sent in the request', function (done) {

			chatService.getChatLines({
				params: ''
			}, {
					send: function (code) {
						code.should.eql(404);
						return this;
					},
					json: function (response) {
						response.should.eql({ message: 'ChatRoom not found.' });
						done();
					}
				});

		});

		it('should call once the repository', function (done) {

			var findChatLines = sandbox.spy(chatRepository, 'findChatLinesByChatRoom');

			chatService.getChatLines({
				params: { room: "chatRoom" }
			}, {
					setHeader: function (header) {
						header.should.eql('Content-Type', 'application/json');
						return this;
					},
					end: function (response) {
						done();
					}
				});

			findChatLines.calledOnce.should.eql(true);

		});

	});

	describe('Service: getChatRooms', function () {

		it('should call once the repository', function (done) {

			var findChatRooms = sandbox.spy(chatRepository, 'findChatRooms');

			chatService.getChatRooms(null, {
				setHeader: function (header) {
					header.should.eql('Content-Type', 'application/json');
					return this;
				},
				end: function (response) {
					done();
				}
			});

			findChatRooms.calledOnce.should.eql(true);

		});
	});

});