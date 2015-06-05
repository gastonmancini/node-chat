'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('chatApp', [
      'ngRoute',
      'chatApp.chatController',
      'chatApp.registerController',
      'chatApp.chatHistoryController',
      'chatApp.authController'
]);

app.config(['$routeProvider', function ($routeProvider) {
      $routeProvider.otherwise({ redirectTo: '/login' });
}]);
