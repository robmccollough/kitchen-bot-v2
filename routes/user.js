const express = require("express");
const router = express.Router();
const User = require("../db/User.js");
const auth = require("../middlewares/auth.js");
const authAdmin = require("../middlewares/authAdmin.js");
const bcrypt = require("bcrypt");

const saltRounds = 10;

//add error checking on all these
//email cant already be used
router.post("/", (req, res) => {
	// make sure email is not already in use
	User.find({ email: req.body.email }).then(result => {
		if (result.length > 0) {
			return res.send({
				success: false,
				error: "Email already in use"
			});
		} else {
			const { email, password } = req.body;

			bcrypt.hash(password, saltRounds, function(err, hash) {
				// Store hash in your password DB.
				if (err) {
					return res.send({ err: "Error creating account", msg: err });
				}

				let user = new User({
					email: email,
					password: hash
				});
				user.save((err, result) => {
					if (err) {
						return res.send({ err: "Error saving account", msg: err });
					}

					res.send({
						success: true,
						created_user: {
							...result._doc
						}
					});
				});
			});
		}
	});
});

router.post("/check", (req, res) => {
	User.findOne({ email: req.body.email })
		.then(result => {
			res.send({
				in_use: result == null
			});
		})
		.catch(err => res.send(err));
});

//these routes require auth

router.get("/", auth, (req, res) => {
	User.findOne({ _id: req.locals.user_id }).then(result => {
		res.send(result);
	});
});

router.post("/guild", authAdmin, (req, res) => {
	if (!req.body.user_id) {
		return res.send({ err: "Expected user_id param" });
	}

	User.updateOne({ _id: req.body.user_id }, { role: "admin" })
		.then(result => {
			res.send(result);
		})
		.catch(err => res.send(err));
});

router.put("/", auth, (req, res) => {
	User.updateOne({ _id: req.locals.user_id }, req.body.update)
		.then(result => {
			res.send(result);
		})
		.catch(err => res.send(err));
});

router.delete("/", auth, (req, res) => {
	User.deleteOne({ _id: req.locals.user_id }).then(result => {
		res.send(result);
	});
});

module.exports = { router: router, prefix: "/user" };
