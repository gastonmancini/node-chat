angular.module('chatApp').controller('ChatHistoryController', function ($scope, $http, $location) {
    
    'use strict';
       
    $scope.chatRoomName = "Lobby";
   
    $http.get('/api/chatroom').success(function(data) {        
        $scope.chatRooms = data;
    });
    
    $http.get('/api/history/Lobby').success(function(data) {
            getHistory("Lobby");        
    });    
    
    $scope.reloadHistory = function (chatRoom) {
        getHistory(chatRoom);
    };
    
    function getHistory(chatRoom) {
        $http.get('/api/history/' + chatRoom).success(function(data) {
            $scope.chatRoomName = chatRoom;
            $scope.chatLines = data;
        });    
    }
});