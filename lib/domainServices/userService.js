module.exports = function (config, jwt, userRepository) {
	
	'use strict';
	
	return {
		
		/**
		 * Register a new user
		 * requires: { user.username, user.email, user.password }
		 * returns: { message, token }
		 */
		registerUser: function(req, res) {
		
			if (!req.body.user) {
				return res.status(400).json({ message: "Bad request." });
			}
		
			var username = req.body.user.username;
			var email = req.body.user.email;
			var password = req.body.user.password;
		
			if (!username || !email || !password) {
				return res.status(400).json({ message: "Bad request." });
			}
		
			userRepository.create(username, email, password, function (err, user) {
				
				if (err) {
					return res.status(500).json({ message: "There was an error processing your request.", err: err });
				}
				
				// Add one day
			    var date = new Date();
			    date.setDate(date.getDate() + 1);
			              
			    var response = {
			          user: user,
			          exp: Math.round(date.getTime() / 1000)
			    };
			              
			    var token = jwt.sign(response, config.secretAuthKey, { expiresInMinutes: 1440 });
			                
			    return res.status(200).json({ message: 'User successfully registered.', token: token });
		
			});
		}				
	};
	
};