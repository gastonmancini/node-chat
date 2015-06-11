angular.module('chatApp').controller('AuthController', function ($scope, $location, AuthService) {
      
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
            AuthService.login(credentials).then(function (user) {
                  // console.log("Login success.");
                  $scope.setCurrentUser(user);
                  $location.path('/chat');
            }, function () {
                      // Show the error
                      $scope.formregister.error = true;   
            });
      };

}); 