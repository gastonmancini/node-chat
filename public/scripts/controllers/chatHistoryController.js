angular.module('chatApp').controller('ChatHistoryController', ['$scope', 'ChatHistoryService', function ($scope, ChatHistoryService) {
    
    'use strict';

    $scope.chatRoomName = 'Lobby';        
    $scope.errorMessage = '';

    loadDefaultData();
    
    $scope.reloadHistory = function (chatRoom) {
        return getHistory(chatRoom);
    };
    
    function loadDefaultData() {
        ChatHistoryService.getChatRooms()
            .then(function (response, status, headers, config) {
                $scope.chatRooms = response.data;
            },function (response, status, headers, config) {
                $scope.errorMessage = 'An error ocurred retrieving the history. Please reload de page.';
            });
        
        getHistory('Lobby');        
    }
    
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