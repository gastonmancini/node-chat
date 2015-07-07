angular.module('chatApp').controller('RegisterController', ['$scope', '$http', '$location', 'UserService', 'AuthService', function ($scope, $http, $location, UserService, AuthService) {
      
      'use strict';
      
      // Initialize the User
      $scope.user = {
            email: '',
            username: '',
            password: ''
      };
      
      // Initialize registration error message
      $scope.errorMessage = '';

      // Register a new user
      $scope.register = function (user) {
            
            // Try to register 
            UserService.register(user)
                  .then(function (response, status, headers, config) { 
                        $location.path('/login/verify_account');
                  }, function (response, status, headers, config) {
                        $scope.errorMessage = response.data.message;      
            });
      };

}]);