module.exports = function (mongoose, encryption) {
	
	'use strict';
	
	var Schema = mongoose.Schema;

	var userSchema = new Schema({
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true }
	});
	
	var User = mongoose.model('User', userSchema);
	
	User.prototype.isValidPassword = function (candidatePassword) {
		return encryption.compare(candidatePassword, this.password);
	};
	
	return User;	
	
};


