const mongoose = require("mongoose");

const Menu = mongoose.model(
	"Menu",
	new mongoose.Schema({
		date: {
			type: Date,
			default: Date.now()
		},
		food: {
			monday: {
				main: {
					type: String,
					required: true
				},
				side: {
					type: String,
					required: true
				}
			},
			tuesday: {
				main: {
					type: String,
					required: true
				},
				side: {
					type: String,
					required: true
				}
			},
			wednesday: {
				main: {
					type: String,
					required: true
				},
				side: {
					type: String,
					required: true
				}
			},
			thursday: {
				main: {
					type: String,
					required: true
				},
				side: {
					type: String,
					required: true
				}
			},
			friday: {
				main: {
					type: String,
					required: true
				},
				side: {
					type: String,
					required: true
				}
			},
			type: Object,
			required: true
		}
	}),
	"menus"
);

module.exports = Menu;
