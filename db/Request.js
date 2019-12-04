const mongoose = require("mongoose");

const Request = mongoose.model(
	"Request",
	new mongoose.Schema({
		created_at: {
			type: Date,
			default: Date.now()
		},
		created_by: {
			type: String,
			required: true
		},
		body: {
			type: String,
			required: true
		}
	}),
	"requests"
);

module.exports = Request;
