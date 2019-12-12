const express = require("express");
const axios = require("axios");
const router = express.Router();
const authAdmin = require("../middlewares/authAdmin.js");
const botService = require("../middlewares/bot");

//only single endpoint
router.post(
	"/",
	botService.parseBotRequest,
	botService.fetchBotResponse,
	(req, res) => {
		//response generated through middleware
		//post request to groupme
		axios({
			method: "POST",
			url: process.env.BOT_POST_URL,
			data: {
				bot_id: process.env.TEST_BOT_ID,
				text: req.bot_response || "Hi There"
			}
		})
			.then(() => {
				res.send({ command: req.command, response: req.bot_response });
			})
			.catch(err => console.log(err));

		//no response required
	}
);

module.exports = { router: router, prefix: "/bot" };
