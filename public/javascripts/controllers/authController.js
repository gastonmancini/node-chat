'use strict';

angular.module('chatApp')

.controller('AuthController', function ($scope, $http, $location) {

      $scope.user = {
            email: '',
            password: ''
      };

      $scope.authenticate = function (user) {
            
      };

});