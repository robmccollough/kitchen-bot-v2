const Menu = require("../db/Menu.js");
const Ban = require("../db/Ban.js");
const LatePlate = require("../db/LatePlate");
const User = require("../db/User");
const axios = require("axios");
const Metric = require("../db/Metric");
const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];

module.exports = {
	getMenu: async () => {
		let menu = await Menu.findOne({}, {}, { $sort: { date: -1 } });
		//if older than 5 days ignore
		let fda = new Date(Date.now() - 432000000);

		if (menu == null || menu.date < fda) {
			return "I do not have a current menu, sorry.";
		}

		Metric.updateOne({ metric: "menu" }, { $inc: { asks: 1 } }).then(r =>
			console.log("Updated Menu Metrics")
		);

		return (
			menu &&
			`Menu\n\t${menu.date.toDateString()}\nMonday:\n\t${
				menu.food.monday.main
			}\n\t${menu.food.monday.side}\nTuesday:\n\t${
				menu.food.tuesday.main
			} \n\t${menu.food.tuesday.side}\nWednesday:\n\t${
				menu.food.wednesday.main
			} \n\t${menu.food.wednesday.side}\nThursday:\n\t${
				menu.food.thursday.main
			} \n\t${menu.food.thursday.side}Friday:\n\t${menu.food.friday.main} \n\t${
				menu.food.friday.side
			}
		`
		);
	},

	getDinner: async () => {
		let menu = await Menu.findOne({}, {}, { $sort: { date: 1 } });
		let fda = new Date(Date.now() - 432000000);
		let day = new Date().getDay();
		if (day == 0 || day == 6) {
			return "There is no dinner tonight.";
		}
		if (menu == null || menu.date < fda) {
			return "I do not have a current menu, sorry.";
		}
		let dinner = menu.food[weekdays[day - 1]];

		Metric.updateOne({ metric: "dinner" }, { $inc: { asks: 1 } }).then(() => {
			console.log("Updated Dinner Asks");
		});

		return `Dinner tonight is:\n\t${dinner.main}|${dinner.side}`;
	},

	postLatePlate: async (recipient, food) => {
		let order = food === "" || food === " " ? false : food;
		if (order) {
			await new LatePlate({
				recipient: recipient,
				food: order,
				withFood: true
			}).save();
		} else {
			await new LatePlate({
				recipient: recipient,
				withFood: false
			}).save();
		}

		Metric.updateOne({ metric: "lateplate" }, { $inc: { asks: 1 } }).then(
			() => {
				console.log("Updated lateplate asks");
			}
		);

		return `Saved LatePlate for ${recipient}${order ? " - " + order : ""}`;
	},

	getLatePlates: async (twilio = false) => {
		//lateplates from that day

		let plates = await LatePlate.find({
			complete: false
		})
			.then(r => {
				console.log(r);
				return r.filter(lp => lp.created_at > new Date().setHours(0));
			})
			.catch(err => console.log(err));

		if (!plates || plates.length < 1) {
			return "There are currently no incomplete late plates.";
		}

		return twilio
			? plates
			: `
			Here are the incomplete late plates from today:
			\nLunch:
			\n${plates
				.filter(p => p.withFood)
				.map(plate => `${plate.recipient} - ${plate.food}`)
				.join("\n")}
			\nDinner:
			\n${plates
				.filter(p => !p.withFood)
				.map(plate => `${plate.recipient}`)
				.join("\n")}
		`;
	},
	completeAllLatePlates: async () => {
		//just update all of them every time
		let updated = await LatePlate.updateMany({}, { complete: true })
			.then(r => {
				console.log(r);
				return r.nModified;
			})
			.catch(err => console.log(err));

		Metric.updateOne(
			{ metric: "lateplate" },
			{ $inc: { total: updated } }
		).then(r => {
			console.log("Updated complete lateplates");
		});

		return updated > 0
			? `Marked ${updated} lateplates from today as complete. Hopefully you actually wrote everyone down.`
			: "All lateplates currently complete.";
	},
	postBan: async ban => {
		//check wether user has provelige to ban
		let admin = await User.findOne({ gm_user_id: ban.sender_id }).then(res => {
			return res && res.role === "admin";
		});

		if (!admin) {
			return `User ${ban.name} does not have permission to ban other users.`;
		}

		let name_to_ban = ban.text.replace("/ban ", "");

		let user_id = await axios({
			method: "GET",
			url: process.env.GROUPME_GROUP_URL,
			headers: {
				"X-Access-Token": process.env.GROUPME_ACCESS_TOKEN
			}
		})
			.then(res => {
				return res.data.response.members.find(
					member => member.nickname == name_to_ban
				).user_id;
			})
			.catch(err => console.log(err));

		if (!user_id) {
			return "I don't recognize that user. Please try again";
		}

		new Ban({
			created_by: ban.sender_id.toString(),
			user_id: user_id.toString(),
			active: true
		}).save();

		return `User ${name_to_ban} is now banned.`;
	},
	promoteUser: async promote => {
		let admin = await User.findOne({ gm_user_id: promote.sender_id }).then(
			res => {
				return res && res.role === "admin";
			}
		);

		if (!admin) {
			return `User ${promote.name} does not have permission to ban other users.`;
		}

		let name_to_promote = promote.text.replace("/promote ", "");

		let user_id = await axios({
			method: "GET",
			url: process.env.GROUPME_GROUP_URL,
			headers: {
				"X-Access-Token": process.env.GROUPME_ACCESS_TOKEN
			}
		})
			.then(res => {
				return res.data.response.members.find(
					member => member.nickname == name_to_promote
				).user_id;
			})
			.catch(err => console.log(err));

		if (!user_id) {
			return "I don't recognize that user. Please try again";
		}

		User.updateOne({ gm_user_id: user_id }, { role: "admin" });

		return `User ${name_to_promote} is now an admin.`;
	},
	sendBotMessage: text => {
		axios({
			method: "POST",
			url: process.env.BOT_POST_URL,
			data: {
				bot_id: process.env.BOT_ID,
				text: text
			}
		}).catch(err => console.log(err));
	}
};
