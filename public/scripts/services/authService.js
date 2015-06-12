angular.module('chatApp').factory('AuthService', ['$http', '$window', 'ApiBaseUrl', function ($http, $window, ApiBaseUrl) {

      'use strict';

      var authService = {};
 
      // Save the token in the local storage
      authService.saveToken = function(token) {
            $window.localStorage.jwtToken = JSON.stringify(token);
      };
      
      // Retrieve the token in the local storage
      authService.getToken = function() {
            return $window.localStorage.jwtToken;
      };
           
      // Login - Make a request to the api for authenticating      
      authService.login = function (credentials) {
            return $http.post(ApiBaseUrl + '/authenticate', credentials);
      };
      
      // Logout
      authService.logout = function () {
            if (this.getToken()) {
                  this.saveToken(null);
            }
      };
      
      // Check if the user is authenticated
      authService.isAuthed = function () {
            
            var token = this.getToken();
            
            console.log(token);
            
            if (token) {
                  
                  var params = parseJwtToken(token);
                  
                  return Math.round(new Date().getTime() / 1000) <= params.exp;
                  
            } else {
                  
                  return false;
                  
            }
      };
      
      // Parse the JSON Web Token
      function parseJwtToken(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-','+').replace('_','/');
            return JSON.parse($window.atob(base64));
      }

      return authService;
}]);