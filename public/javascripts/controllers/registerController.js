'use strict';

angular.module('chatApp')

.controller('RegisterController', function ($scope, $http, $location) {

      $scope.user = {
            email: '',
            username: '',
            password: ''
      };

      $scope.register = function (user) {
            $http.post('/register', { 'user': user },
                  {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                  })
                  .success(function () {
                  $location.path('/');
            });
      };

});