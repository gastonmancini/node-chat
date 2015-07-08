module.exports = function (config, mailer) {

	'use strict';
	
	var transport;

	return {
		
		/**
		 * Setup the email client
		 */
		setup: function (service, user, pass, callback) {
			transport = mailer.createTransport({
  			    service: service,
  			    auth: {
  			        user: user,
  			        pass: pass
  			    }}, callback);
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