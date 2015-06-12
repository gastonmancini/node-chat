angular.module('chatApp').controller('RegisterController', ['$scope', '$http', '$location', 'ApiBaseUrl', function ($scope, $http, $location, ApiBaseUrl) {
      
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
            
            $http.post(ApiBaseUrl + '/users', { 'user': user })
                  .success(function () {
                        // Redirect to the chat
                        $location.path('/');
                  })
                  .error(function () {
                        // Show the error
                        $scope.formregister.error = true;   
                  });
      };

}]);