const mongoose = require("mongoose");
//this will just be a single item for now
const Metric = mongoose.model(
	"Metric",
	new mongoose.Schema({
		metric: {
			type: String,
			required: true
		},
		asks: {
			type: Number
		},
		total: {
			//this represents completed for lateplate
			type: Number
		}
	}),
	"metrics"
);

module.exports = Metric;
