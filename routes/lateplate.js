const express = require("express");
const router = express.Router();
const LatePlate = require("../db/LatePlate.js");
const auth = require("../middlewares/auth.js");
const authAdmin = require("../middlewares/authAdmin.js");

router.post("/", authAdmin, (req, res) => {
	new LatePlate(req.body).save().then(result => {
		res.send(result);
	});
});

router.get("/", auth, (req, res) => {
	let date = new Date().setDate(Date.now().getDate() - 1);
	LatePlate.find({ date: { $gt: date } }).then(result => {
		res.send(result);
	});
});

router.put("/", auth, (req, res) => {
	LatePlate.findOne({ _id: req.lp_id })
		.then(r =>
			LatePlate.updateOne(
				{ _id: req.lp_id },
				{ complete: !r.complete }
			).then(r => res.send(r))
		)
		.catch(e => res.send(e));
});

module.exports = { router: router, prefix: "/lp" };
