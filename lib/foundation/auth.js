var errorHandler = require('./errorHandler');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userRepository = require('../repositories/userRepository');

/**
 * The following methods are used by passport for serializing sessions
 */
passport.serializeUser(function (user, done) {
  // console.log("serializeUser: " + user);
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  userRepository.findById(id, function (err, user) {
    // console.log("deserializeUser: " + id);
    done(err, user);
  });
});

/**
 * User passport local strategy for auth
 */
passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
},
  function (email, password, done) {
    userRepository.findByEmail(email, function (err, user) {
      
      if (err) {
        console.log("Error trying to log in.");
        return done(err);
      }
      
      if (!user) {
        console.log("User not found.");
        return done(null, false);
      }
      
      if (!user.comparePassword(password)) {
        console.log("Invalid password supplied.");
        return done(null, false);
      }
      
      return done(null, user);
    });
  }
));

/**
 * Returns the authenticated user information
 * 
 */
exports.session = function (req, res) {
    // Don't retrieve the password
    delete req.user.password;
    console.log("Check if the user has the password: " + req.user);
    res.json(req.user);
};

/**
 * Logout 
 */
exports.logout = function (req, res) {
    if (req.user) {
        req.logout();
        res.sendStatus(200);
    } else {
        errorHandler.send400();
    }
};

/**
 *  Login
 */
exports.login = function (req, res, next) {
  
    passport.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error) {
            errorHandler.send400(res);
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err); 
            }
            res.json(req.user);
        });
    })(req, res, next);
};

/**
 * Middleware to ensure that the user is authenticated
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  
  if (req.isAuthenticated()) { 
      // console.log("isAuthenticated"); 
      return next(); 
  }
  errorHandler.send403(res);
};