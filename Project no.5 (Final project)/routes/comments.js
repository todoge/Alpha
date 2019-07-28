const express = require("express");
const router = express.Router({ mergeParams: true });
const campground = require("../models/campgroundModel");
const Comment = require("../models/commentsModel");

//Creating comments
router.get("/new", isLoggedIn, (req, res) => {
	campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log("Campground does not exist");
		}
		else {
			res.render("comments/new", { campground: campground });
		}
	})
});

router.post("/", isLoggedIn, (req, res) => {
	campground.findById(req.params.id, (err, campgroundFound) => {
		if (err) {
			console.log(err);
		}
		else {
			Comment.create(req.body.Comment, (err, newComment) => {
				if (err) {
					console.log(err);
				}
				else {
					console.log(req.user);
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save();
					console.log(newComment);
					campgroundFound.comments.push(newComment);
					campgroundFound.save();
					res.redirect("/campgrounds/" + campgroundFound._id);
				}
			})
		}
	})
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