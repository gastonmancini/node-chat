'use strict';

// Create a new service for managing websockets with socketIo. 
angular.module('chatApp').factory('SocketService', function ($rootScope) {

      var socketService = {};

      var socket = io.connect();

      socketService.on = function (eventName, callback) {
            socket.on(eventName, function () {
                  var args = arguments;
                  $rootScope.$apply(function () {
                        callback.apply(socket, args);
                  });
            });
      };

      socketService.emit = function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                  var args = arguments;
                  $rootScope.$apply(function () {
                        if (callback) {
                           callback.apply(socket, args);
                        }
                  });
            });
      };

      return socketService;
});