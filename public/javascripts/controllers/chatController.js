'use strict';

angular.module('chatApp.chatController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chat', {
    templateUrl: '/views/chat.html',
    controller: 'ChatController'
  });
}])

.controller('ChatController', function ($scope, $http, $location) {
  
      
});