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
            // Try to login 
            AuthService.login(credentials).then(function (res) {
                  
                  // Set the current user and redirect to the chat
                  var params = AuthService.parseToken(res.data.token);
                  $scope.setCurrentUser(params.user._id, params.user.email, params.user.username);
                  
                  $location.path('/chat');
            }, function () {
                  // Show the error
                  $scope.formregister.error = true;   
            });
      };

}]); 