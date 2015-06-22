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
                        var params = AuthService.parseToken(response.data.token);
                        $scope.setCurrentUser(params.user._id, params.user.email, params.user.username);
                        $location.path('/chat'); 
                  }, function (response, status, headers, config) {
                        $scope.errorMessage = response.data.message;      
            });
      };

}]);