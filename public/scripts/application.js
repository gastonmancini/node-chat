(function () {

  'use strict';

    
  // Declare app level module
  var app = angular.module('chatApp', ['ngRoute', 'ngSanitize']);

  // Define a constant with the API base url
  app.constant('ApiBaseUrl', '/api');

  // Configure the application routes
  app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
      
    // Remove the hash from url
    // $locationProvider.html5Mode(true);
      
    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
      .when('/login', {
      templateUrl: '/views/login.html',
      controller: 'LoginController',
      auth: false
    })
      .when('/login/:param', {
      templateUrl: '/views/login.html',
      controller: 'LoginController',
      auth: false
    })
      .when('/chat', {
      templateUrl: '/views/chat.html',
      controller: 'ChatController',
      auth: true
    })
      .when('/history', {
      templateUrl: '/views/chatHistory.html',
      controller: 'ChatHistoryController',
      auth: true
    })
      .when('/register', {
      templateUrl: '/views/register.html',
      controller: 'RegisterController',
      auth: false
    })

      .otherwise({ redirectTo: '/login' });
  }]);

  // Check if the user is authenticated, and if not redirect to the login page
  app.run(['$route', '$rootScope', '$location', 'AuthService', function ($route, $rootScope, $location, AuthService) {

    $rootScope.$on('$locationChangeStart', function (ev, next, current) {
      var nextPath = $location.path();
      var nextRoute = $route.routes[nextPath];

      if (nextRoute && nextRoute.auth && !AuthService.isAuthed()) {
        $location.path('/login');
      }

    });

  }]);

})();
