module.exports = function (app) {

  'use strict';

  var libPath = __dirname + '/../../lib';

  var app = { nodechat: {
    dependencies: {},
    domainServices: {},
    foundation: {},
    models: {},
    repositories: {}
  }};

  // Register third-party modules
  app.nodechat.dependencies.bCrypt = require('bcrypt-nodejs');
  app.nodechat.dependencies.jwt = require('jsonwebtoken');
  app.nodechat.dependencies.mongoose = require('mongoose');
  
  // Register configuration
  app.nodechat.config = require(libPath + '/config/config');
    
  // Register the foundation services
  app.nodechat.foundation.encryption = require(libPath + '/foundation/encryption')(app.nodechat.dependencies.bCrypt);
  
  // Register the entities...
  app.nodechat.models.User = require(libPath + '/models/user')(app.nodechat.dependencies.mongoose, app.nodechat.foundation.encryption);
  app.nodechat.models.ChatLine = require(libPath + '/models/chatLine')(app.nodechat.dependencies.mongoose);
  
  // Register the repositories
  app.nodechat.repositories.chatRepository = require(libPath + '/repositories/chatRepository')(app.nodechat.dependencies.mongoose, app.nodechat.models.ChatLine);
  app.nodechat.repositories.userRepository = require(libPath + '/repositories/userRepository')(app.nodechat.dependencies.mongoose, app.nodechat.models.User, app.nodechat.foundation.encryption);
  
  // Register the domainServices
  app.nodechat.domainServices.authService = require(libPath + '/domainServices/authService')(app.nodechat.config, app.nodechat.dependencies.jwt, app.nodechat.repositories.userRepository);
  app.nodechat.domainServices.chatService = require(libPath + '/domainServices/chatService')(app.nodechat.repositories.chatRepository);
  app.nodechat.domainServices.userService = require(libPath + '/domainServices/userService')(app.nodechat.config, app.nodechat.dependencies.jwt, app.nodechat.repositories.userRepository);

  // Connect to mongoDb
  var db = app.nodechat.dependencies.mongoose.connect(app.nodechat.config.db, function (err) {
    
    if (err) {
      console.log('Error connecting to the database' + app.nodechat.config.db + '. Error: ' + err);
    }

    console.log('Successfully connected to: ' + app.nodechat.config.db);

    app.nodechat.repositories.userRepository.create('e2e_user', 'e2e@test.com', 'e2epassword', null); 

  });

  return app.nodechat;
};