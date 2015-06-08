'use strict';

// Declare app level module
var app = angular.module('chatApp', ['ngRoute']);

// Configure the application routes
app.config(['$routeProvider', function ($routeProvider) {

      $routeProvider
            .when('/login', {
            templateUrl: '/views/login.html',
            controller: 'AuthController',
            access: {
                  requireLogin: false
            }
      })
            .when('/chat', {
            templateUrl: '/views/chat.html',
            controller: 'ChatController',
            access: {
                  requireLogin: true
            }
      })
            .when('/history', {
            templateUrl: '/views/chatHistory.html',
            controller: 'ChatHistoryController',
            access: {
                  requireLogin: true
            }
      })
            .when('/register', {
            templateUrl: '/views/register.html',
            controller: 'RegisterController',
            access: {
                  requireLogin: false
            }
      })

            .otherwise({ redirectTo: '/login' });
}]);

// Check if the user is authenticated, and if not show the login page
app.run(function ($location, $rootScope, AuthService) {
 
      // Watch the currentUser variable   
      $rootScope.$watch('currentUser', function (currentUser) {
       
            // If the user is not in the rootScope adn the page requires auth, try to get it
            if (!$rootScope.currentUser && $location.path() != "/login" && $location.path() != "/register") {
                  AuthService.getCurrentUser();
            }
      });

       $rootScope.$on('$routeChangeStart', function (event, next) {
            var requireLogin = next.access.requireLogin;

            if (requireLogin && !$rootScope.currentUser) {
                  event.preventDefault();
                  $location.path('/login');
            }
       });
            
});