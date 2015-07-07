module.exports = function (socketio, chatRepository) {
	
	'use strict';
	
	var io;
	var guestNumber = 1;
	var nickNames = {};
	var namesUsed = [];
	var currentRoom = {};

	return {
		/**
		 * Starts the Socket.IO seerver, limits the verbosity of the logging console and 
		 * establishes how each incoming connection should be handled
		 */
		listen: function (server) {
			// Start socket.io server, allowing it to piggyback on existing http server
			io = socketio.listen(server);
			
			// Define how each user connection will be handled
			io.sockets.on('connection', function (socket) {
				
				// Assign user a guest name when they connect
				guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
				
				// Place user in Lobby room when they connect
				joinRoom(socket, 'Lobby');
				
				// Handle user messages
				handleMessageBroadcasting(socket, nickNames);
				// Handle user name-change attempts
				handleNameChangeAttempts(socket, nickNames, namesUsed);
				// handle room creation/changes
				handleRoomJoining(socket);
				
				// Provide user with list of occupied rooms on request
				socket.on('rooms', function() {
					socket.emit('rooms', findRooms());
				});
				
				// Define cleanup logic for when user disconnects
				handleClientDisconnection(socket, nickNames, namesUsed);
			});
		}		
	};
	
	/**
	 * Handles the naming of new users
	 */
	function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
		// Generate new guest name
		var name = 'Guest' + guestNumber;
		// Associate guest name with client connection ID
		nickNames[socket.id] = name;
		// Let user know their guest name
		socket.emit('nameResult', {
			success: true,
			name: name
		});
		// Note that guest name is now used
		namesUsed.push(name);
		// Increment counter used to generate guest names
		return guestNumber + 1;
	}
	
	/**
	 * Handles the logic to a user joining a chat room
	 */
	function joinRoom(socket, room) {
		
		// Make user join room
		socket.join(room);
		// Note that user is now in this room
		currentRoom[socket.id] = room;
		// Let user know they're now in new room
		socket.emit('joinResult', {room: room});
		// Let other users in room know that user has joined
		socket.broadcast.to(room).emit('message', {
			text: nickNames[socket.id] + ' has joined ' + room + '.'
		});
		
		// Determine which other users are in same room as user
		var usersInRoom = findClientsSocketByRoomId(room);
		// If other users exist, summarize who they are
		if (usersInRoom.length > 1) {
			var usersInRoomSummary = 'Users currently in ' + room + ': ';
			for (var index in usersInRoom) {
				var userSocketId = usersInRoom[index].id;
				if (userSocketId != socket.id) {
					if (index > 0) {
						usersInRoomSummary += ', ';
					}
					usersInRoomSummary += nickNames[userSocketId];
				}
			}
			usersInRoomSummary += '.';
			// Send summary of other users in the room to the user
			socket.emit('message', {text: usersInRoomSummary});
		}
	}
	
	/**
	 * Handle requests by users to change their names
	 */
	 function handleNameChangeAttempts(socket, nickNames, namesUsed) {
		 // Add listener for nameAttempt events
		 socket.on('nameAttempt', function(name) {
			 // Do not allow nicknames to begin with Guest
			 if (name.indexOf('Guest') === 0) {
				 socket.emit('nameResult', {
					 success: false,
					 message: 'Names cannot begin with "Guest".'
				 });
			 } else {
				 // If name isn't already registered, register it
				 if (namesUsed.indexOf(name) == -1) {
					 var previousName = nickNames[socket.id];
					 var previousNameIndex = namesUsed.indexOf(previousName);
					 namesUsed.push(name);
					 nickNames[socket.id] = name;
					 // Remove previous name to make available to other clients
					 delete namesUsed[previousNameIndex];
					 socket.emit('nameResult', {
						 success: true,
						 name: name
					 });
					 socket.broadcast.to(currentRoom[socket.id]).emit('message', {
						 text: previousName + ' is now known as ' + name + '.'
					 });
				 } else {
					 // Send error to client if name is already registered
					 socket.emit('nameResult', {
						 success: false,
						 message: 'That name is already in use.'
					 });
				 }
			 }
		 });
	 }
	 
	 /**
	  * Handle sent from a user.
	  * (The user emits an event indicating the room where the message is to be sent and the message)
	  */
	 function handleMessageBroadcasting(socket) {
		 socket.on('message', function (message) {
			 socket.broadcast.to(message.room).emit('message', {
				 text: nickNames[socket.id] + ': ' + message.text
			 });
			 
			 chatRepository.createChatLine(message.room, nickNames[socket.id], message.text, function(err) {
				 if (err) {
					 throw err;
				 }
			 });
		 });
	 }
	
	/**
	 * Allows a user to join an existing room or, if it doesn't exist yet, to create it.
	 */
	function handleRoomJoining(socket) {
		socket.on('join', function (room) {
			socket.leave(currentRoom[socket.id]);
			joinRoom(socket, room.newRoom);
		});
	}
	
	/**
	 * Handle user disconnections
	 */
	function handleClientDisconnection(socket) {
		socket.on('disconnect', function() {
			var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
			delete namesUsed[nameIndex];
			delete nickNames[socket.id];
		});
	}
	
	/**
	 * Return the clients for a given room
	 */
	function findClientsSocketByRoomId(roomId) {
		var res = [];
		var room = io.sockets.adapter.rooms[roomId];
		if (room) {
		    for (var id in room) {
		    	res.push(io.sockets.adapter.nsp.connected[id]);
		    }
		}
		return res;
	}
	
	/**
	 * Returns the list of available chatrooms
	 */
	function findRooms() {
		var res = [];
		var rooms = io.sockets.adapter.rooms;
		if (rooms) {
		    for (var room in rooms) {
				if (!rooms[room].hasOwnProperty(room)) {
					res.push(room);
				}
		    }
		}
		
		return res;
	}
};