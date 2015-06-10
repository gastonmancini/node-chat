var bCrypt = require('bcrypt-nodejs');

exports.encrypt = function (obj) {
	return bCrypt.hashSync(obj, bCrypt.genSaltSync(10), null);
};

exports.compare = function (obj1, obj2) {
	return bCrypt.compareSync(obj1, obj2);
};