// Create a new service for Auth. 
// REMEMBER that all services in Angular are singletons (the injector caches the reference for all future needs)
angular.module('chatApp').factory('AuthService', function ($http, $window) {

      'use strict';

      var authService = {};
     
      // API Login
      authService.login = function (credentials) {
            return $http
                  .post('/auth', credentials,
                  {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                  })
                  .then(function (res) {
                  $window.localStorage.currentUser = JSON.stringify(res.data);
                  return res.data;
            });
      };
      
      // API Logout
      authService.logout = function () {
            if ($window.localStorage.currentUser) {
                  $window.localStorage.currentUser = null;
                  return $http.delete('/auth');
            }
      };
      
      // Returns the current user. Try to get it from the session, and if it is not there then hit the api.
      authService.getCurrentUser = function () {
            if ($window.localStorage.currentUser) {
                  return (JSON.parse($window.localStorage.currentUser));
            } else {
                  return $http.get('/auth').then(function(res) {
                        $window.localStorage.currentUser = JSON.stringify(res.data);
                        return res.data;
                  });
            }
      };

      return authService;
});