'use strict';

angular.module('chatApp.registerController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: '/views/register.html',
    controller: 'RegisterController'
  });
}])

.controller('RegisterController', function ($scope, $http, $location) {

      $scope.user = {
            email: '',
            username: '',
            password: ''
      };

      $scope.register = function (user) {
            $http.post('/register', { 'user': user },
                  {
                        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
                  })
                  .success(function () {
                  $location.path('/');
            });
      };

});