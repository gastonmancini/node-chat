'use strict';

var app = angular.module('chatApp', []);

app.controller('AuthController', function ($scope, $http, $location) {

      $scope.user = {
            email: '',
            password: ''
      };

      $scope.register = function (user) {
            
      };

});