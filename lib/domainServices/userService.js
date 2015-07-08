module.exports = function (config, jwt, userRepository, mailer, crypto) {

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
				return res.status(400).json({ message: "Bad request." });
			}

			var username = req.body.user.username;
			var email = req.body.user.email;
			var password = req.body.user.password;

			if (!username || !email || !password) {
				return res.status(400).json({ message: "Bad request." });
			}

			userRepository.create(username, email, password, false, verificationToken, function (err, user) {

				if (err) {
					return res.status(500).json({ message: "There was an error processing your request.", err: err });
				}
				
				sendEmailAccountVerification(req.get('host'), user);

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
				return res.status(400).json({ message: "Bad request." });
			}
			
			userRepository.findById(userId, function (err, user) {
				
				if (err) {
					return res.status(500).json({ message: "There was an error processing your request.", err: err });
				}
				
				if (user.verified) {
					return res.status(400).json({ message: "Bad request. The user account is already verified." });
				}
				
				if (user.verificationToken != token) {
					return res.status(401).json({ message: 'Account verification failed. Wrong token.' });
				}
				
				user.verified = true;
				
				userRepository.update(user);

				return res.redirect(config.baseUrl + '/login/registration_success');
					
			});
			
		}
	};
	
	/**
	 * Sends the email to allow the user verify the account
	 */
	function sendEmailAccountVerification(host, user) {
    
	      var link = "http://" + host + "/api/users/" + user._id + "/verify/" + verificationToken;
		  
		  var to = user.email;
		  var subject = "NodeChat Account activation";
	      var body = "Welcome to the NodeChat,<br> To proceed, please verify your email address.<br><a href=" + link + ">Click here to verify</a>";
		  
	      mailer.sendEmail(to, subject, body, function (err) {
	          if (err) {
	            console.log("An error ocurred sending the account verification email. Error: " + err);
	          }
	      });
		 
	}
    
};