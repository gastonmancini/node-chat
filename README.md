# Node-Chat

The project is a multiroom Node.js chat web app. It allows users to chat online with each other by entering messages into a simple form. A message, once entered, is sent to all the other users in the same chat room. When starting the application, a user is automatically assigned a guest name, but it can be  changed by entering a command. Chat commands are prefaced with a slash (/). Similarly, a user can enter a command to create a new chat room (or join it if it already exists). You can simply register by email and start chatting.

## Overview

### Server

Runs on a [Node.js](https://nodejs.org) server. Uses [socket.io](http://socket.io) library for communication and [MongoDb](http://mongodb.org/) for storing the chats and users.

### Client

Uses [Angular.js](https://angularjs.org/) as a javascript mvw framework and [socket.io](http://socket.io) library for communication.

### API

There are some available endpoints:

- */api/authenticate*: Retrieves a token for a known user
  - Method: POST
  - Header: none
  - Body: { email: '', password: ''}
  - Response: A JSON object containing the jwt auth token.
- */api/users*: Register a new user
  - Method: POST
  - Header: none
  - Body: { email: '', username: '', password: ''}
  - Response: A JSON object containing the jwt auth token.
- */api/chatrooms*: List the full history of chatrooms (requires authentication)
  - Method: GET
  - Header: x-access-token
  - Parameters: None
  - Response: A JSON object containing all the history of chatroom names.
- */api/history/{chatRoomName}*: List the list of messages for the chatRoomName (requires authentication)
  - Method: GET
  - Header: x-access-token
  - Parameters: string
  - Response: A JSON object containing the full list of messages in a given chatrooom.

## Getting started

To get you started you can simply clone the repository and install the dependencies.

### Prerequisites
  
You need git to clone the repository. You can get git from [http://git-scm.com/](http://git-scm.com/).

I also use a number of node.js tools to initialize and test the node-chat. You must have node.js and
its package manager (npm) installed. You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone node-chat

Clone the angular-seed repository using git:

```
git clone https://github.com/gastonmancini/node-chat.git
cd node-chat
```

### Install Dependencies

You can get the tools we depend upon via `npm`, the node package manager.
 

Simply do:

```
npm install
```

You should find that you have a new folder in your project:

* `node_modules` - contains the npm packages for the tools we need

### Run the Application

The simplest way to start
this server is:

```
node server.js
```

Now browse to the app at `http://localhost:3000/`.

## Issues and nice-to-have features
Please report any issue or nice to have feature [here](https://github.com/gastonmancini/node-chat/issues/).

## Production
Currently available online in [heroku](http://chat-node-tio.herokuapp.com).
