module.exports = function (LoggerService) {

	'use strict';
	
	var logger;

	return {
		
		/**
		 * Setup the logger client using the access token
		 */
		setupWithAccessToken: function (accessToken, callback) {
			logger = new LoggerService({ token: accessToken }, callback);
        },
		
		/**
		 * Log with Debug level
		 */
		debug: function (message) {
			logger.debug(message);
        },
		
		/**
		 * Log with Info level
		 */
		info: function (message) {
			logger.info(message);
        },
		
		/**
		 * Log with Warning level
		 */
		warning: function (message) {
			logger.warning(message);
        },
		
		/**
		 * Log with Error level
		 */
		error: function (message) {
			logger.error(message);
        }
	};

};