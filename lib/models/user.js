var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	// TODO: store an encrypted password
	password: { type: String, required: true }
});

var User = mongoose.model('User', userSchema);

User.prototype.comparePassword = function (candidatePassword) {
	if (candidatePassword != this.password) {
		return false;
	} else {
		return true;
	}
};

module.exports = User;