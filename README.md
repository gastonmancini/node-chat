# Node-Chat

A multiroom Node.js chat application. It allows users to chat online with each other by entering messages into a simple form. A message, once entered, is sent to all the other users in the same chat room. When starting the application, a user is automatically assigned a guest name, but it can be  changed by entering a command. Chat commands are prefaced with a slash (/). Similarly, a user can enter a command to create a new chat room (or join it if it already exists).

## Server

Runs on a [Node.js](https://nodejs.org) server and uses [socket.io](http://socket.io) library for communication and mongoDb for storing the chats. 

## Client

Uses [Angular.js](https://angularjs.org/) as a javascript mvw framework and [socket.io](http://socket.io) library for communication. Some features were also developed with [jQuery](https://jquery.com).

## API

There are some available endpoints:

###/api/chatrooms: List the full history of chatrooms
**Parameters**: None
**Response**: A JSON object containing all the history of chatroom names.
###/api/history/{chatRoomName}: List the list of messages for the chatRoomName.
**Parameters**: chatRoomName
**Response**: A JSON object containing the full list of messages in a given chatrooom.

Currently available in [heroku](http://chat-node-tio.herokuapp.com).

