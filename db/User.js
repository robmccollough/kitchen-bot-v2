const mongoose = require("mongoose");

const User = mongoose.model(
	"User",
	new mongoose.Schema({
		created_at: {
			type: Date,
			default: new Date()
		},
		role: {
			type: String,
			enum: ["admin", "user"],
			default: "user"
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		gm_user_id: {
			type: String,
			required: false
		}
	}),
	"users"
);

module.exports = User;
