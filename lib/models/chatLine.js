module.exports = function (mongoose) {

	'use strict';

	var Schema = mongoose.Schema;

	var chatLineSchema = new Schema({
		chatRoom: String,
		nickName: String,
		message: String,
		serverDateTime: String
	});

	var ChatLine = mongoose.model('ChatLine', chatLineSchema);

	ChatLine.prototype.toString = function () {
		return this.chatRoom +
			' | ' + this.serverDateTime +
			' | ' + this.nickName +
			' | ' + this.message;
	};

	return ChatLine;

};