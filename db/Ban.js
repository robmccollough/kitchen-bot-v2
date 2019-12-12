const mongoose = require("mongoose");

const Ban = mongoose.model(
	"Ban",
	new mongoose.Schema({
		created_at: {
			type: Date,
			default: new Date()
		},
		created_by: {
			type: String,
			required: true
		},
		user_id: {
			type: String,
			required: true
		},
		ban_end: {
			type: Date,
			required: false
		},
		active: {
			type: Boolean,
			required: true
		}
	}),
	"bans"
);

module.exports = Ban;
