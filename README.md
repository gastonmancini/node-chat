# Node-Chat

The project is a multiroom Node.js chat web app. It allows users to chat online with each other by entering messages into a simple form. A message, once entered, is sent to all the other users in the same chat room. When starting the application, a user is automatically assigned a guest name, but it can be  changed by entering a command. Chat commands are prefaced with a slash (/). Similarly, a user can enter a command to create a new chat room (or join it if it already exists). You can simply register by email and start chatting.

## Overview

### Server

Runs on a [NodeJs](https://nodejs.org) server. Uses [socket.io](http://socket.io) library for communication and [MongoDb](http://mongodb.org/) for storing the chats and users.

### Client

Uses [AngularJs](https://angularjs.org/) as a javascript mvw framework and [socket.io](http://socket.io) library for communication.

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
  
You need git to clone the repository. You can get git from the [Git website](http://git-scm.com/).

I also use a number of node.js tools to initialize and test the node-chat. You must have node.js and
its package manager (npm) installed. You can get them from the [NodeJs website](http://nodejs.org/).

### Clone node-chat

Clone the node-chat repository using git:

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

## Build process

Install [Gulp](http://gulpjs.com/) (may require installing Gulp globally npm install gulp -g).

[Gulp](http://gulpjs.com/) build script checks for JavaScript errors, optimizes css, jasvascripts, and concatenates and minifies files. It also restarts the server when changes are detected and run the tests.

### Available gulp commands

* `gulp` — Compile and optimize the files in your build directory. Any changes in the javascript and css files will be automatically processed by Gulp
* `gulp test-frontend` — Excecutes all the frontend tests
* `gulp test-backend` — Excecutes all the backend tests
* `gulp test-e2e` — Excecutes all the end to end tests

It's highly recommended to use `gulp` during development.

## Testing

There are three kinds of tests in the node-chat application: frontend unit tests, backend unit tests and end to end tests.

### Running the frontend unit tests

The node-chat app frontend comes preconfigured with unit tests. These are written in [Jasmine](http://jasmine.github.io/), which are run with the [Karma Test Runner](http://karma-runner.github.io/).  Karma configuration file to run them is priovided.

* the configuration is found at `karma.conf.js`
* the frontend unit tests are found in the folder `/test/frontend-unit-tests/specs/` and are named as `*.spec.js`.

The easiest way to run the unit tests is to use the gulp script:

```
gulp test-frontend
```

This script will start the Karma test runner to execute the unit tests. 

### Running the backend unit tests

The node-chat app backend comes preconfigured with unit tests written with [Mocha](http://mochajs.org/), [Sinon](http://sinonjs.org/) and [Should](http://shouldjs.github.io/).

* the backend unit tests can be found in the folder `/test/backend-unit-tests/specs/` and are named as `*.spec.js`.

The easiest way to run the unit tests is to use the gulp script:

```
gulp test-backend
```

This script will start the Mocha test runner to execute the unit tests. 

### End to end testing

The node-chat app comes with end-to-end tests, again written in [Jasmine](http://jasmine.github.io/). These tests
are run with the [Protractor](http://angular.github.io/protractor/#/) end to end test runner. 

* the configuration is found at `/test/e2e-tests/protractor.conf.js`
* the end to end tests are found in `/test/e2e-tests/scenarios/*.spec.js`

Protractor simulates interaction with our web app and verifies that the application responds correctly. Therefore, our web server needs to be serving up the application, so that Protractor can interact with it.

In addition, since Protractor is built upon WebDriver we need to install this. The node-chat project comes with a predefined script to do this:

```
gulp webdriver-update
```

This will download and install the latest version of the stand-alone WebDriver tool.

Once you have ensured that the development web server hosting our application is up and running and WebDriver is updated, you can run the end-to-end tests using the supplied npm script:

```
gulp test-e2e
```

This script will execute the end-to-end tests against the application being hosted on the development server.

## Issues and nice-to-have features
Please report any issue or nice to have feature [here](https://github.com/gastonmancini/node-chat/issues/).

## Production
Currently available online in [heroku](http://chat-node-tio.herokuapp.com).
