module.exports = function (config, jwt, userRepository, mailer, crypto, logger) {

	'use strict';
	
	// Create a random verification token
	var verificationToken = crypto.randomBytes(64).toString('hex');

	return {
		
		/**
		 * Register a new user
		 * requires: { user.username, user.email, user.password }
		 * returns: { message, token }
		 */
		registerUser: function (req, res) {

			if (!req.body.user) {
				logger.warning('Bad request. The user is not set in the request body.');
				return res.status(400).json({ message: 'Bad request.' });
			}

			var username = req.body.user.username;
			var email = req.body.user.email;
			var password = req.body.user.password;

			if (!username || !email || !password) {
				logger.warning('Bad request. The username, email or password is not set in the request.');
				return res.status(400).json({ message: 'Bad request.' });
			}

			userRepository.create(username, email, password, false, verificationToken, function (err, user) {

				if (err) {
					logger.error('An error ocurred creating the user. User: ' + user + '.Error: ' + err);
					return res.status(500).json({ message: 'There was an error processing your request.', err: err });
				}
				
				sendEmailAccountVerification(req.get('host'), user);

				logger.debug('User successfully created. User: ' + user);
				return res.status(200).json({ message: 'User successfully registered. Please verify your email.'});

			});
		},
		
		/**
		 * Verify new user account
		 * requires: { userId, verificationToken }
		 * returns: { redirect }
		 */
		verifyAccount : function (req, res) {
			
			var userId = req.params.userId;
			var token = req.params.verificationToken;
			
			if (!userId || !token) {
				logger.warning('Bad request. The userId or the token is not set in the request.');
				return res.status(400).json({ message: 'Bad request.' });
			}
			
			userRepository.findById(userId, function (err, user) {
				
				if (err) {
					logger.error('An error ocurred verifying the user account. User: ' + user + '. Error: ' + err);
					return res.status(500).json({ message: 'There was an error processing your request.', err: err });
				}
				
				if (user.verified) {
					logger.warning('An error ocurred verifying the user account. User: " + user + ". Error: the user account is not verified yet.');
					return res.status(400).json({ message: 'Bad request. The user account is already verified.' });
				}
				
				if (user.verificationToken != token) {
					logger.warning('An error ocurred verifying the user account. User: ' + user + '. Error: the verification tokens does not match.');
					return res.status(401).json({ message: 'Account verification failed. Wrong token.' });
				}
				
				user.verified = true;
				
				userRepository.update(user);

				logger.debug('User successfully verified. User: ' + user);
				return res.redirect(config.baseUrl + '/login/registration_success');
					
			});
			
		}
	};
	
	/**
	 * Sends the email to allow the user verify the account
	 */
	function sendEmailAccountVerification(host, user) {
    
	      var link = 'http://' + host + '/api/users/' + user._id + '/verify/' + verificationToken;
		  
		  var to = user.email;
		  var subject = 'NodeChat Account activation';
	      var body = "Welcome to the NodeChat,<br> To proceed, please verify your email address.<br><a href=" + link + ">Click here to verify</a>";
		  
	      mailer.sendEmail(to, subject, body, function (err) {
	          if (err) {
	            logger.error('An error ocurred sending the account verification email. Error: ' + err);
	          } else {
				  logger.debug('Verification account email successfully sent.');
			  }
	      });
	}
    
};