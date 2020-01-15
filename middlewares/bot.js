const Menu = require("../db/Menu");
const User = require("../db/User");
const Ban = require("../db/Ban");
const Service = require("../service/bot");

async function parseBotRequest(req, res, next) {
	//add check for some unqiue quality of ktichenbots message to provide authentication

	if (req.body.sender_type == "bot") {
		return res.send("Bot Msg");
	}
	const regex = /^\/menu\b|^\/dinner\b|^\/ban\b|^\/lp\b|^\/all-lp\b|^\/complete-lp\b|^\/promote\b/;
	if (!regex.test(req.body.text)) {
		return res.send("No Op");
	}

	const banned = await Ban.countDocuments({
		user_id: req.body.sender_id,
		active: true
	}).then(r => (r > 0 ? true : false));

	if (banned) {
		return Service.sendBotMessage(
			`Ignoring command from banned user: ${req.body.name}`
		);
	}

	req.command = regex.exec(req.body.text)[0].slice(1);

	console.log(req.command);

	next();
}

async function fetchBotResponse(req, res, next) {
	switch (req.command) {
		case "menu": {
			req.bot_response = await Service.getMenu();
			break;
		}
		case "dinner":
			req.bot_response = await Service.getDinner();
			break;
		case "ban":
			req.bot_response = await Service.postBan(req.body);
			break;

		case "lp":
			req.bot_response = await Service.postLatePlate(
				req.body.name,
				req.body.text.replace("/lp", "")
			);
			break;
		case "all-lp":
			req.bot_response = await Service.getLatePlates();
			break;

		case "complete-lp":
			req.bot_response = await Service.completeAllLatePlates();
			break;
		case "promote":
			req.bot_response = await Service.promoteUser(req.body);
			break;
		default:
	}
	next();
}

module.exports = {
	parseBotRequest: parseBotRequest,
	fetchBotResponse: fetchBotResponse
};
