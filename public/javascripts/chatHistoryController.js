'use strict';

var app = angular.module('chatApp', []);


app.controller('ChatHistoryController', function ($scope, $http, $location) {
   
    $scope.chatRoomName = "Lobby";
   
    $http.get('/api/chatroom').success(function(data) {        
        $scope.chatRooms = [];
        $.each(data, function(index, chatRoom) {
            $scope.chatRooms.push(chatRoom);
        });        
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
            $scope.chatLines = [];
            $.each(data, function(index, chatLine) {
                $scope.chatLines.push(chatLine);
            });         
        });    
    };
});