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
			console.log(err);
			return res.redirect("/register");
		}
		else {
			passport.authenticate("local")(req, res, () => {
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
	req.logout();
	res.redirect("/campgrounds");
});

//middleware to check if user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	}
	else {
		res.redirect("/login");
	}
};

module.exports = router;