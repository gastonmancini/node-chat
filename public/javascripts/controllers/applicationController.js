'use strict';

// Container for the global application logic / Alternative to the Angular's run function
angular.module('chatApp').controller('ApplicationController', function ($scope, $rootScope, $location, AuthService) {
            
      // Initialize the current user in the app rootScope    
      $rootScope.currentUser = AuthService.getCurrentUser();
       
      // Helper method for setting the user in the rootScope
      $scope.setCurrentUser = function (user) {
            $rootScope.currentUser = user;
      };
        
      // Logout from the chat
      $scope.logout = function () {
            
            AuthService.logout().then(function () {
                  console.log("Logout success.");
            });

            $rootScope.currentUser = null;
            $location.path('/login');
            
      };
});