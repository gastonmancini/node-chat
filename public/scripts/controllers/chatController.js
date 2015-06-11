angular.module('chatApp').controller('ChatController', ['$scope', '$window', '$sce', 'SocketService', function ($scope, $window, $sce, SocketService) {
      
      'use strict';
      
      $scope.messages = [];
      $scope.roomList = [];
      $scope.room = 'Lobby';
      $scope.inputMessage = '';
      $scope.newRoom = '';
      $scope.newRoomError = false;
                  
      // Display results of a name-change attempt
      SocketService.on('nameResult', function (result) {
          	var message;
          	
            if (result.success) {
                  message = 'You are now known as ' + result.name + '.';
          	} else {
                  message = result.message;
          	}
            $scope.messages.push(message);
      });
              
      // Display results of a room change       
      SocketService.on('joinResult', function (result) {
          	$scope.room = result.room;
            $scope.messages = [];
            $scope.messages.push('You are now in the room ' + result.room);
      });    
          
      // Display received messages
      SocketService.on('message', function (message) {
            $scope.messages.push(message.text);
      });    			
          
      // Display list of rooms available
      SocketService.on('rooms', function (rooms) {
            $scope.roomList = [];
          	for (var room in rooms) {
                room = room.substring(1, room.length);
                if (room !== '') {
                    $scope.roomList.push(room);
                }
          	}

      });
          
      // Request list of rooms available intermittently
      setInterval(function () {
            SocketService.emit('rooms');
      }, 1000);
          
      // Allow submitting the form to send a chat message
      $scope.submit = function (message) {
        	processUserInput(message);
      };
      
      // Allow click a room name to change to that chatroom
      $scope.focusChatroom = function (room) {
		processCommand('/join ' + room);
            $scope.messages = [];
            $scope.messages.push('Room changed.');
	};
      
      // Create new chatroom
      $scope.createNewChatroom = function (room) {
            if (!room) {
                  $scope.newRoomError = true;
	      } else {
      		 processUserInput("/join " + room);
      	  	 $('#myModal').modal('hide');
      		 $scope.newRoomError = false;
      	}
      };
      
      // Sanizite Html
      $scope.sanitizeHtml = function(value) {
        return $sce.trustAsHtml(value);
      };
        
      /**
       * Private helpers
       */
      
      // Process the input 
      function processUserInput(message) {
            var systemMessage;
          	
            // If user input begins with slash, treat it as command
            if (message.charAt(0) == '/') {
                  systemMessage = processCommand(message);
                  if (systemMessage) {
                        $scope.messages.push(systemMessage);
                  }
            } else {
                  // Broadcast noncommand input to other users
                  sendMessage($scope.room, message);
                  // TODO: escapar el siguiente mensaje
                  $scope.messages.push("Me: " + message);
            }

            $scope.inputMessage = '';
      }
          
      // Send chat messages
      function sendMessage(room, text) {
            var message = {
                  room: room,
                  text: text
            };
            SocketService.emit('message', message);
      }
      	
      // Change rooms
      function changeRoom(room) {
            SocketService.emit('join', {
                  newRoom: room
            });
      }
      	
      // Processing chat commands
      function processCommand(command) {
            var words = command.split(' ');
            // Parse command from first word
            command = words[0]
                  .substring(1, words[0].length)
                  .toLowerCase();
            var message = false;
  
            switch (command) {
                  case 'join':
                        words.shift();
                        var room = words.join(' ');
                        // Handle room changing / creating
                        changeRoom(room);
                        break;
                  case 'nick':
                        words.shift();
                        var name = words.join(' ');
                        // Handle name-change attempts
                        SocketService.emit('nameAttempt', name);
                        break;
                  default:
                        // Return error message if command isn't recognized 
                        message = 'Unrecognized command.';
                        break;
            }

            return message;
      }

}]);