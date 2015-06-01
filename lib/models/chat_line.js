var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var chatLineSchema = new Schema({
	chatRoom: String,
	nickName: String,
	message: String,
	serverDateTime: String
});

var ChatLine = mongoose.model('ChatLine', chatLineSchema);

ChatLine.prototype.print = function () {
	console.log(this.chatRoom
		+ ' | ' + this.serverDateTime
		+ ' | ' + this.nickName
		+ ' | ' + this.message);
};

module.exports = ChatLine;