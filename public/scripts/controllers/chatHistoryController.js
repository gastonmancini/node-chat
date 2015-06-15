angular.module('chatApp').controller('ChatHistoryController', ['$scope', '$http', '$location', 'ApiBaseUrl', function ($scope, $http, $location, ApiBaseUrl) {
    
    'use strict';
       
    $scope.chatRoomName = "Lobby";
   
    $http.get(ApiBaseUrl + '/chatroom').success(function(data) {        
        $scope.chatRooms = data;
    });
    
    $http.get(ApiBaseUrl + '/history/Lobby').success(function(data) {
        $scope.chatRoomName = "Lobby";
        $scope.chatLines = data;       
    });
    
    $scope.reloadHistory = function (chatRoom) {
        getHistory(chatRoom);
    };
    
    function getHistory(chatRoom) {
        $http.get(ApiBaseUrl + '/history/' + chatRoom).success(function(data) {
            $scope.chatRoomName = chatRoom;
            $scope.chatLines = data;
        });    
    }
}]);