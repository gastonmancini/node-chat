angular.module('chatApp').controller('ChatHistoryController', ['$scope', '$http', '$location', 'ChatHistoryService', function ($scope, $http, $location, ChatHistoryService) {
    
    'use strict';
       
    // Initialize the chatroom name   
    $scope.chatRoomName = 'Lobby';
    
    // Initialize the error message
    $scope.errorMessage = '';
   
    ChatHistoryService.getChatRooms()
        .then(function (response, status, headers, config) {
            $scope.chatRooms = response.data;
        },function (response, status, headers, config) {
            $scope.errorMessage = 'An error ocurred retrieving the history. Please reload de page.';
        });
    
    getHistory('Lobby');
    
    $scope.reloadHistory = function (chatRoom) {
        return getHistory(chatRoom);
    };
    
    function getHistory(chatRoom) {
        ChatHistoryService.getChatRoomHistory(chatRoom)
            .then(function (response, status, headers, config) {
                $scope.chatRoomName = chatRoom;
                $scope.chatLines = response.data;       
            }, function (response, status, headers, config) {
                $scope.errorMessage = 'An error ocurred retrieving the history. Please reload de page.';       
            });
    }
    
}]);