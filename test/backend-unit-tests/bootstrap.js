module.exports = function (app) {

  'use strict';

  var libPath = __dirname + '/../../lib';

  app.nodechat = {
    dependencies: {},
    domainServices: {},
    foundation: {},
    models: {},
    repositories: {}
  };

  // Native modules
  app.nodechat.dependencies.crypto = require('crypto');

  // Register third-party modules
  app.nodechat.dependencies.bCrypt = require('bcrypt-nodejs');
  app.nodechat.dependencies.jwt = require('jsonwebtoken');
  app.nodechat.dependencies.mongoose = require('mongoose');
  app.nodechat.dependencies.nodemailer = require('nodemailer');
  
  // Register configuration
  app.nodechat.config = require(libPath + '/config/config');
  
  // Connect to mongoDb
  var db = app.nodechat.dependencies.mongoose.connect(app.nodechat.config.db, function (err) {
    if (err) {
      console.log('Error connecting to the database' + app.nodechat.config.db + '. Error: ' + err);
    }
  });
  
  // Register the foundation services
  app.nodechat.foundation.encryption = require(libPath + '/foundation/encryption')(app.nodechat.dependencies.bCrypt);
  app.nodechat.foundation.mailer = require(libPath + '/foundation/mailer')(app.nodechat.config, app.nodechat.dependencies.nodemailer);
  
  // Setup mailer
  app.nodechat.foundation.mailer.setup(app.nodechat.config.smtpService, app.nodechat.config.smtpUser, app.nodechat.config.smtpPassword,
  	function (err) {
         console.log("An error ocurred creating the SMTP transport. Error: " + err);
  });
 
 
  // Register the entities...
  app.nodechat.models.User = require(libPath + '/models/user')(app.nodechat.dependencies.mongoose, app.nodechat.foundation.encryption);
  app.nodechat.models.ChatLine = require(libPath + '/models/chatLine')(app.nodechat.dependencies.mongoose);
  
  // Register the repositories
  app.nodechat.repositories.chatRepository = require(libPath + '/repositories/chatRepository')(app.nodechat.dependencies.mongoose, app.nodechat.models.ChatLine);
  app.nodechat.repositories.userRepository = require(libPath + '/repositories/userRepository')(app.nodechat.dependencies.mongoose, app.nodechat.models.User, app.nodechat.foundation.encryption);
  
  // Register the domainServices
  app.nodechat.domainServices.authService = require(libPath + '/domainServices/authService')(app.nodechat.config, app.nodechat.dependencies.jwt, app.nodechat.repositories.userRepository);
  app.nodechat.domainServices.chatService = require(libPath + '/domainServices/chatService')(app.nodechat.repositories.chatRepository);
  app.nodechat.domainServices.userService = require(libPath + '/domainServices/userService')(app.nodechat.config, app.nodechat.dependencies.jwt, app.nodechat.repositories.userRepository, app.nodechat.foundation.mailer, app.nodechat.dependencies.crypto);

  return app.nodechat;
};