// Container for the global application logic / Alternative to the Angular's run function
angular.module('chatApp').controller('ApplicationController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
      
      'use strict';            
      
      var token = null;
      var message = null;
      
      // Handle incoming response     
      function handleRequest(res) {
            token = res.data ? res.data.token : null;
            if (token) { console.log('JWT:', token); }
            message = res.data.message; 
      }
      
      // Logout from the chat
      $scope.logout = function () {
            AuthService.logout();
            $location.path('/login');
      };
}]);  