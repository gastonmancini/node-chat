module.exports = function (mongoose, User, encryption) {

	return {
		/**
		 * Creates a new user
		 */
		create: function (username, email, password, callback) {
		
			var user = new User();
			user.username = username;
			user.email = email;
			user.password = encryption.encrypt(password);
		
			user.save(callback);
		},
		
		/**
		 * Retrieves a user by email
		 */
		findByEmail: function (email, callback) {
			return User.findOne({ 'email': email }, callback);
		},
		
		/**
		 * Retrieves a user by id
		 */
		findById: function (id, callback) {
			return User.findOne({ '_id': id }, callback);
		},
		
		/**
		 * Retrieves a user by username
		 */
		findByUsername: function (username, callback) {
			return User.findOne({ 'username': username }, callback);
		}
				
	};
	
};