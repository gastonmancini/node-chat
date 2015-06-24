angular.module('chatApp').controller('LoginController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
      
      'use strict';
      
      // Initialize credentials
      $scope.credentials = {
            email: '',
            password: ''
      };
      
      // Initialize the error message
      $scope.errorMessage = '';

      // Authenticate 
      $scope.authenticate = function (credentials) {
            
            // Try to login 
            AuthService.login(credentials)
                  .then(function (response, status, headers, config) {
                        var params = AuthService.parseToken(response.data.token);
                        $scope.setCurrentUser(params.user._id, params.user.email, params.user.username);
                        $location.path('/chat');
                  }, function (response, status, headers, config) {
                        $scope.errorMessage = response.data.message;      
                  });
      };

}]); 