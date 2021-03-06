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
  app.nodechat.dependencies.logentries = require('le_node');
  app.nodechat.dependencies.mongoose = require('mongoose');
  app.nodechat.dependencies.nodemailer = require('nodemailer');
  app.nodechat.dependencies.nodemailer.transport = require('nodemailer-mandrill-transport');
  
  // Register configuration
  app.nodechat.config = require(libPath + '/config/config');
  
  // Register the foundation services
  app.nodechat.foundation.encryption = require(libPath + '/foundation/encryption')(app.nodechat.dependencies.bCrypt);
  app.nodechat.foundation.mailer = require(libPath + '/foundation/mailer')(app.nodechat.config, app.nodechat.dependencies.nodemailer.transport, app.nodechat.dependencies.nodemailer);
  app.nodechat.foundation.logger = require(libPath + '/foundation/logger')(app.nodechat.dependencies.logentries);
  
  // Setup logger
  app.nodechat.foundation.logger.setupWithAccessToken(app.nodechat.config.loggerAccessToken,
  	function (err) {
         app.nodechat.foundation.logger.error("An error ocurred creating the logger service. Error: " + err);
  });
  
  // Setup mailer
  app.nodechat.foundation.mailer.setupWithApiKey(app.nodechat.config.smtpApiKey,
  	function (err) {
         app.nodechat.foundation.logger.error("An error ocurred creating the SMTP transport. Error: " + err);
  });
 
  // Connect to mongoDb
  var db = app.nodechat.dependencies.mongoose.connect(app.nodechat.config.db, function (err) {
    if (err) {
      app.nodechat.foundation.logger.error('Error connecting to the database' + app.nodechat.config.db + '. Error: ' + err);
    }
  });
 
  // Register the entities...
  app.nodechat.models.User = require(libPath + '/models/user')(app.nodechat.dependencies.mongoose, app.nodechat.foundation.encryption);
  app.nodechat.models.ChatLine = require(libPath + '/models/chatLine')(app.nodechat.dependencies.mongoose);
  
  // Register the repositories
  app.nodechat.repositories.chatRepository = require(libPath + '/repositories/chatRepository')(app.nodechat.dependencies.mongoose, app.nodechat.models.ChatLine);
  app.nodechat.repositories.userRepository = require(libPath + '/repositories/userRepository')(app.nodechat.dependencies.mongoose, app.nodechat.models.User, app.nodechat.foundation.encryption);
  
  // Register the domainServices
  app.nodechat.domainServices.authService = require(libPath + '/domainServices/authService')(app.nodechat.config, app.nodechat.dependencies.jwt, app.nodechat.repositories.userRepository, app.nodechat.foundation.logger);
  app.nodechat.domainServices.chatService = require(libPath + '/domainServices/chatService')(app.nodechat.repositories.chatRepository, app.nodechat.foundation.logger);
  app.nodechat.domainServices.userService = require(libPath + '/domainServices/userService')(app.nodechat.config, app.nodechat.dependencies.jwt, app.nodechat.repositories.userRepository, app.nodechat.foundation.mailer, app.nodechat.dependencies.crypto, app.nodechat.foundation.logger);

  return app.nodechat;
};