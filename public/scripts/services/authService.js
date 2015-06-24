angular.module('chatApp').factory('AuthService', ['$http', '$window', 'ApiBaseUrl', function ($http, $window, ApiBaseUrl) {

      'use strict';

      var authService = {};
 
      // Save the token in the local storage
      authService.saveToken = function(token) {
            $window.localStorage.setItem('jwtToken', token);
      };
      
      // Retrieve the token in the local storage
      authService.getToken = function() {
            return $window.localStorage.getItem('jwtToken');
      };
           
      // Login - Make a request to the api for authenticating      
      authService.login = function (credentials) {
            return $http.post(ApiBaseUrl + '/authenticate', credentials);
      };
      
      // Logout
      authService.logout = function () {
            if (authService.getToken()) {
                  $window.localStorage.removeItem('jwtToken');
            }
      };
      
      // Check if the user is authenticated
      authService.isAuthed = function () {
            
            var token = authService.getToken();
            
            if (token) {
                  
                  var params = authService.parseToken(token);
                  var dateNow = Math.round(new Date().getTime() / 1000);
                  
                  // If the token has not expired
                  return dateNow <= params.exp;
                  
            } else {
                  
                  return false;
                  
            }
      };
      
      // Parse the JSON Web Token
      authService.parseToken = function (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-','+').replace('_','/');
            return JSON.parse($window.atob(base64));
      };

      return authService;
}]);