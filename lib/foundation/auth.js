var errorHandler = require('./errorHandler');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userRepository = require('../repositories/userRepository');

/**
 * The following methods are used by passport for serializing sessions
 */
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  userRepository.findById(id, function (err, user) {
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
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          'errors': {
            'email': { type: 'Email is not registered.' }
          }
        });
      }
      if (!user.comparePassword(password)) {
        return done(null, false, {
          'errors': {
            'password': { type: 'Password is incorrect.' }
          }
        });
      }
      return done(null, user);
    });
  }
));

/**
 * Returns the authenticated user information
 * TODO: do not retrieve the password
 */
exports.session = function (req, res) {
    res.json(req.user);
};

/**
 * Logout 
 */
exports.logout = function (req, res) {
    if (req.user) {
        req.logout();
        res.send(200);
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
            errorHandler.send400();
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.send(err);
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
      return next(); 
  }
  errorHandler.send403(res);
};