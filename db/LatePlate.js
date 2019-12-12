const mongoose = require("mongoose");

const LatePlate = mongoose.model(
	"LatePlate",
	new mongoose.Schema({
		created_at: {
			type: Date,
			default: new Date()
		},
		recipient: {
			type: String,
			required: [true, "Late plate recipient required"]
		},
		complete: {
			type: Boolean,
			default: false
		},
		withFood: {
			type: Boolean,
			default: false,
			required: false
		},
		food: {
			type: String,
			required: false
		}
	}),
	"lateplates"
);

module.exports = LatePlate;
