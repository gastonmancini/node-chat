'use strict';

describe('Controller: ChatHistoryController', function () {

  var ChatHistoryService, createChatHistoryController, scope;

  beforeEach(function () {
    module('chatApp');
  });

  beforeEach(function () {

    inject(function ($controller, $rootScope, _ChatHistoryService_) {
      scope = $rootScope.$new();
      ChatHistoryService = _ChatHistoryService_;
      createChatHistoryController = function (params) {
        return $controller('ChatHistoryController', {
          $scope: scope,
          $stateParams: params || {}
        });
      };
      createChatHistoryController();
    });

  });

  it('should be correctly initialized', function () {
    expect(scope.chatRoomName).toBe('Lobby');
    expect(scope.errorMessage).toBe('');
  });

  it('should show an error if the reload history fails', function () {

    spyOn(ChatHistoryService, 'getChatRoomHistory').and.callFake(function () {
      return {
        then: function (success, error) {
          return error();
        }
      };
    });

    scope.reloadHistory('testChatRoomName');
    expect(scope.errorMessage).toBe('An error ocurred retrieving the history. Please reload de page.');

  });

  it('should reload the chatroom history', function () {

    var history = "a lot of messages";
    var chatRoomName = "testChatRoomName";

    spyOn(ChatHistoryService, 'getChatRoomHistory').and.callFake(function () {

      var response = { data: history };

      return {
        then: function (success, error) {
          return success(response);
        }
      };
    });

    scope.reloadHistory(chatRoomName);
    expect(scope.chatRoomName).toBe(chatRoomName);
    expect(scope.chatLines).toBe(history);

  });

});