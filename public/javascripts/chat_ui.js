/**
 * Used for displaying untrusted text.
 * Sanitize text by transforming special chars into html entities.
 */
function divEscapedContentElement(message) {
	return $('<div></div>').text(message);
}

/**
 * Display trusted content created by system rather than by other users.
 */
function divSystemContentElement(message) {
	return $('<div></div>').html('<i>' + message + '</i>');
}

/**
 * Process user input
 */
function processUserInput(chatApp, socket) {
	var message = $('#send-message').val();
	var systemMessage;
	
	// If user input begins with slash, treat it as command
	if (message.charAt(0) == '/') {
		systemMessage = chatApp.processCommand(message);
		if (systemMessage) {
			$('#message').append(divSystemContentElement(systemMessage));
		}
	} else {
		// Broadcast noncommand input to other users
		chatApp.sendMessage($('#room').text(), message);
		$('#messages').append(divEscapedContentElement("Me: " + message));
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	}
	
	$('#send-message').val('');
}

var socket = io.connect();

$(document).ready(function() {
	var chatApp = new Chat(socket);
	
	// Display results of a name-change attempt
	socket.on('nameResult', function (result) {
		var message;
		
		if (result.success) {
			message = 'You are now known as ' + result.name + '.';
		} else {
			message = result.message;
		}
		
		$('#messages').append(divSystemContentElement(message));
	});
	
	// Display results of a room change
	socket.on('joinResult', function (result) {
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('Room changed.'));
	});
	
	// Display received messages
	socket.on('message', function (message) {
		var newElement = $('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});
	
	// Display list of rooms available
	socket.on('rooms', function (rooms) {
		$('#room-list').empty();
		
		for (var room in rooms) {
			room = room.substring(1, room.length);
			if (room != '') {
				$('#room-list').append(divEscapedContentElement(room));
			}
		}
		
		// Allow click a room name to change to that chatroom
		$('#room-list div').click( function () {
			chatApp.processCommand('/join ' + $(this).text());
			$('#send-message').focus();
		});
	});
	
	// Request list of rooms available intermittently
	setInterval(function () {
		socket.emit('rooms');
	}, 1000);
	$('#send-message').focus();
	
	// Allow submitting the form to send a chat message
	$('#send-form').submit(function () {
		processUserInput(chatApp, socket);
		return false;
	});
});

