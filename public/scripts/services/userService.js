angular.module('chatApp').factory('UserService', ['$http', 'ApiBaseUrl', function ($http, ApiBaseUrl) {

      'use strict';

      var userService = {};
            
      // Register a new user      
      userService.register = function (user) {
          return $http.post(ApiBaseUrl + '/users', { 'user': user });
      };
      
      return userService;
}]);