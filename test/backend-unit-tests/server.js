module.exports = (function () {

	'use strict';

	var app = {};
	
	// Bootstrap application tests
	var nodechat = require('./bootstrap')(app);

	return nodechat;

})();
