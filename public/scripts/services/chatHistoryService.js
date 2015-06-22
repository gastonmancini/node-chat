angular.module('chatApp').factory('ChatHistoryService', ['$http', 'ApiBaseUrl', function ($http, ApiBaseUrl) {
      
      'use strict';
      
      var chatHistoryService = {};

      // Get the chat history of a given chatroom 
      chatHistoryService.getChatRoomHistory = function (chatRoom) {
            return $http.get(ApiBaseUrl + '/history/' + chatRoom);
      };
      
      // Get all the chatrooms that have history
      chatHistoryService.getChatRooms = function () {
            return $http.get(ApiBaseUrl + '/chatroom');
      };

      return chatHistoryService;
}]);