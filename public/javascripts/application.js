(function(){
    
'use strict';

    
// Declare app level module
var app = angular.module('chatApp', ['ngRoute', 'ngSanitize']);

// Configure the application routes
app.config(['$routeProvider', '$locationProvider' , function ($routeProvider, $locationProvider) {
      
      // Remove the hash from url
      // $locationProvider.html5Mode(true);
      
      $routeProvider
            .when('/login', {
            templateUrl: '/views/login.html',
            controller: 'AuthController',
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

// Check if the user is authenticated, and if not show the login page
app.run(['$location', '$rootScope', 'AuthService', function ($location, $rootScope, AuthService) {
 
      // Watch the currentUser variable   
      $rootScope.$watch('currentUser', function (currentUser) {
       
            // If the user is not in the rootScope adn the page requires auth, try to get it
            if (!$rootScope.currentUser && $location.path() != "/login" && $location.path() != "/register") {
                  AuthService.getCurrentUser();
            }
      });

       $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var requireLogin = next.auth;
            if (requireLogin && !$rootScope.currentUser) { 
                  AuthService.getCurrentUser();
            }
       });
            
}]);

})();
