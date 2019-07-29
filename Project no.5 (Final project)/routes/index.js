const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const passport = require("passport");

//RENDER HOME PAGE
router.get("/", (req, res) => {
	res.render("landing");
});

//REGISTER ROUTE
router.get("/register", (req, res) => {
	res.render("register");
});
router.post("/register", (req, res) => {
	User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
		if (err) {
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		else {
			passport.authenticate("local")(req, res, () => {
				req.flash("success", "Welcome " + req.user.username + "!");
				res.redirect("/campgrounds");
			})
		}
	})
});

//LOGIN ROUTE
router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), (req, res) => {
});

//LOGOUT ROUTE
router.get("/logout", (req, res) => {
	req.flash("success", "You have successfully logged out!")
	req.logout();
	res.redirect("/campgrounds");
});

module.exports = router;