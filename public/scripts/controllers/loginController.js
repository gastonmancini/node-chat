angular.module('chatApp').controller('LoginController', ['$scope', '$location', '$routeParams','AuthService', function ($scope, $location, $routeParams, AuthService) {
      
      'use strict';
      
      // Initialize credentials
      $scope.credentials = {
            email: '',
            password: ''
      };
      
      // Initialize the error message
      $scope.errorMessage = '';
      
      // Initialize the default message
      $scope.defaultMessage = '';
      
      var param = $routeParams.param;
      if (param) {
            if (param === 'registration_success') {   
                  $scope.defaultMessage = 'Your account was successfully verified.';
            } else if (param === 'verify_account') {
                        $scope.defaultMessage = 'Please check your email to verify the new account.';
            }
      }
      
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