angular.module('chatApp').controller('AuthController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
      
      'use strict';
      
      // Initialize credentials
      $scope.credentials = {
            email: '',
            password: ''
      };
      
      // Initialize login error message visibility
      $scope.formregister = {
            error: false
      };

      // Authenticate
      $scope.authenticate = function (credentials) {
            // Try to login and send the auth events on success and failure
            AuthService.login(credentials).then(function () {
                  console.log("Login success.");
                  $location.path('/chat');
            }, function () {
                  console.log("Login error.");
                  // Show the error
                  $scope.formregister.error = true;   
            });
      };

}]); 