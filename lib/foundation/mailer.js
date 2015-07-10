module.exports = function (config, transportPlugin, mailer) {

	'use strict';
	
	var transport;

	return {
		
		/**
		 * Setup the email client using credentials
		 */
		setupWithCredentials: function (service, user, pass, callback) {
			transport = mailer.createTransport({
  			    service: service,
  			    auth: {
  			        user: user,
  			        pass: pass
  			    }}, callback);
        },
		
		/**
		 * Setup the email client using an api key
		 */
		setupWithApiKey: function (apiKey, callback) {
			transport = mailer.createTransport(transportPlugin({
  			    auth: {
  			        apiKey: apiKey
  			    }}), callback);
        },
		
		/**
		 * Send email
		 */
		sendEmail: function (to, subject, body, callback) {
	
		  var mailOptions = { from: config.defaultFromEmailAddress, to: to, subject: subject, html: body };
		  
	      transport.sendMail(mailOptions, callback);
		}
	};

};