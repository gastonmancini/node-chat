angular.module('chatApp').controller('RegisterController', function ($scope, $http, $location) {
      
      'use strict';
      
      // Initialize the User
      $scope.user = {
            email: '',
            username: '',
            password: ''
      };
      
      // Initialize registration error message visibility
      $scope.formregister = {
            error: false
      };

      // Register a new user
      $scope.register = function (user) {
            
            $http.post('/users', { 'user': user },
                  {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                  })
                  .success(function () {
                        // Redirect to the chat
                        $location.path('/');
                  })
                  .error(function () {
                        // Show the error
                        $scope.formregister.error = true;   
                  });
      };

});