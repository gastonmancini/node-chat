module.exports = function (bCrypt) {
	
	'use strict';
	
	return {
		
		/**
		 * Encrypt the given object
		 */
		encrypt: function (obj) {
			return bCrypt.hashSync(obj, bCrypt.genSaltSync(10), null);
		},
		
		/**
		 * Compare the given objects
		 */
		compare: function (obj1, obj2) {
			return bCrypt.compareSync(obj1, obj2);
		}		
	};
	
};