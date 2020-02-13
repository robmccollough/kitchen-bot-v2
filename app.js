require("dotenv").config();
const express = require("express");
const app = express();
const cron = require("node-cron");
const path = require("path");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const fs = require("fs");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const bp = require("body-parser");
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const to = process.env.TWILIO_TO;
const from = process.env.TWILIO_FROM;
const client = require("twilio")(accountSid, authToken);
const Service = require("./service/bot");

//shameless season 2
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(cors());
app.use(bearerToken());

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//cronjobs
cron.schedule("45 16 * * Monday,Tuesday,Wednesday,Thursday", async () => {
	let lps = Service.getLatePlates(true)
		.filter(p => !p.withFood)
		.map(plate => `${plate.recipient}`)
		.join("\n");

	//twilio time
	client.messages
		.create({
			body: lps,
			to: to,
			from: from
		})
		.then(msg => {
			console.log(`Twilio Message Sent\n${msg}`);
		})
		.catch(e => {
			console.log(`\nTwilio Errorr\n`);
		});
});

//shameless
const files = fs.readdirSync(path.join(__dirname, "routes"));
files.forEach(file => {
	const router = require(path.join(__dirname, "./routes", file));

	if (!router.router) {
		console.log(`'${file}' did not export a 'router'. Skipped`);
		return;
	}
	if (!router.prefix) {
		console.log(`'${file}' did not export a 'prefix' path. Defaulting to '/'`);
	}

	app.use(router.prefix || "/", router.router);
	console.log(`registered '${file}' to route '${router.prefix || "/"}'`);
});

app.listen(port, () => {
	if (process.argv[2] === "--dev") {
		require("./dev").dev(port, process.env.LT_SUBDOMAIN);
	}
	console.log(`App listening on port ${port}!`);
});
