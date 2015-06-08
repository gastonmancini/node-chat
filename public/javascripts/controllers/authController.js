'use strict';

angular.module('chatApp')

      .controller('AuthController', function ($scope, $location, AuthService) {

      // Initialize credentials
      $scope.credentials = {
            email: '',
            password: ''
      };

      // Authenticate
      $scope.authenticate = function (credentials) {
            // Try to login and send the auth events on success and failure
            AuthService.login(credentials).then(function (user) {
                  console.log("Login success.");
                  $scope.setCurrentUser(user);
                  $location.path('/chat');
            }, function () {
                     console.log("Login failed.");
            });
      };

});