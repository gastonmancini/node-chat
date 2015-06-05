'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('chatApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
     
      $routeProvider
      .when('/login', {
            templateUrl: '/views/login.html',
            controller: 'AuthController'
      })
      .when('/chat', {
        templateUrl: '/views/chat.html',
        controller: 'ChatController'
      })   
      .when('/history', {
        templateUrl: '/views/chatHistory.html',
        controller: 'ChatHistoryController'
      })  
      .when('/register', {
        templateUrl: '/views/register.html',
        controller: 'RegisterController'
      })

      .otherwise({ redirectTo: '/login' });
}]);
