// Container for the global application logic / Alternative to the Angular's run function
angular.module('chatApp').controller('ApplicationController', ['$scope', '$window', '$location', 'AuthService', function ($scope, $window, $location, AuthService) {

      'use strict';
      
      // Store current user info
      $scope.setCurrentUser = function (_id, email, username) {
            var me = {
                  _id: _id,
                  username: username,
                  email: email
            };
            $window.localStorage.setItem("currentUser", JSON.stringify(me));
      };
      
      // Retrieve current user info
      $scope.getCurrentUser = function () {
            return JSON.parse($window.localStorage.getItem("currentUser"));
      };
      
      // Check if the user is authenticated
      $scope.isAuthed = function () {
            return AuthService.isAuthed() !== null && AuthService.isAuthed() !== false;
      };
      
      // Logout from the chat
      $scope.logout = function () {
            AuthService.logout();
            $window.localStorage.removeItem('currentUser');
            $location.path('/login');
      };
}]);  