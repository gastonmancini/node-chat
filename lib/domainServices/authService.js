module.exports = function (config, jwt, userRepository, logger) {

  'use strict';

  return {
      
    /**
     * Authenticates a user
     * require: { email, password }
     * returns: { message, token }
     */
    authenticate: function (req, res) {

      var email = req.body.email;
      userRepository.findByEmail(email, function (err, user) {

        if (err) {
          logger.error('An error ocurred authenticating the user. Error: ' + err);
          return res.status(400).json({ message: 'Authentication failed.' });
        }
          
        // If the user does not exist
        if (!user) {
          logger.warning('An error ocurred authenticating the user. Error: The user does not exist. User: ' + user);
          return res.status(404).json({ message: 'Authentication failed. User not found.' });
        }
        
        // Check if the user is verified      
        if (!user.verified) {
          logger.warning('An error ocurred authenticating the user. Error: The user account was not verified yet. User: ' + user);
          return res.status(401).json({ message: 'Authentication failed. The account was not verified yet.' });
        } 

        var password = req.body.password;
                  
        // Check if the password matches      
        if (!user.isValidPassword(password)) {
          logger.warning('An error ocurred authenticating the user. Error: The passwords does not match. User: ' + user);
          return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        } 
                      
        // Add one day
        var date = new Date();
        date.setDate(date.getDate() + 1);

        var response = {
          user: user,
          exp: Math.round(date.getTime() / 1000)
        };
                    
        // If the user is found and the password correct then create a token that expires within 24hs
        var token = jwt.sign(response, config.secretAuthKey, { expiresInMinutes: 1440 });

        logger.debug('User was succesfully authenticated. User: ' + user);
        return res.status(200).json({ message: 'Authentication success.', token: token });
      });
    },
      
    /**
     * Middleware to verify a token
     * require: { token }
     * returns: { }
     */
    verifySignature: function (req, res, next) {
        
      // Check header, url or post parameters to get the token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
        
      // If there is no token then return an error
      if (!token) {
        logger.warning('An error ocurred verifying the request signature. Error: token is not set.' );
        return res.status(403).json({ message: 'Auth verification failed. No token provided.' });
      } 
        
      // Decode and verify the token
      jwt.verify(token, config.secretAuthKey, function (err, decodedToken) {
        if (err) {
          logger.error('An error ocurred verifying the user signature. Error: ' + err);
          return res.status(401).json({ message: 'Failed to authenticate token.' });
        } else {
          // If everything goes right, save the request for use in other routes
          logger.debug('Request signature was succesfully verified.');
          req.decoded = decodedToken;
          next();
        }
      });
    }
  };

};
