const express = require("express");
const router = express.Router();
const User = require("../db/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

//validates user, if user exists then return the _id of said user along with a jwt
router.post("/", async (req, res) => {
	//check if username and pass are there and strings
	if (!req.body.email || !req.body.password) {
		return res.send({ err: "Invalid payload, email or password not supplied" });
	}

	let user = await User.findOne({ email: req.body.email });

	if (!user) {
		return res.send({ err: "User with provided email does not exist" });
	}

	bcrypt.compare(req.body.password, user.password, async (err, auth) => {
		if (err) {
			return res.send({ err: "Error in checking password", msg: err });
		}
		if (!auth) {
			return res.send({ err: "Invalid username or password" });
		}

		if (req.body.gm_access_token) {
			await axios({
				method: "get",
				url: process.env.GROUPME_USER_URL,
				params: {
					token: req.body.gm_access_token
				}
			}).then(result => console.log(result));
		}

		const token = jwt.sign(
			{
				user_id: user._id,
				role: user.role,
				password: req.body.password
			},
			process.env.JWT_KEY
		);

		res.send({
			authenticated: true,
			token: token,
			data: { user_id: user._id, role: user.role }
		});
	});
});

module.exports = { router: router, prefix: "/login" };
