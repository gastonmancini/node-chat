'use strict';

angular.module('chatApp.authController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: '/views/login.html',
    controller: 'AuthController'
  });
}])

.controller('AuthController', function ($scope, $http, $location) {

      $scope.user = {
            email: '',
            password: ''
      };

      $scope.authenticate = function (user) {
            
      };

});