const campground = require("../models/campgroundModel");
const Comment = require("../models/commentsModel");

var middlewareObj = {

	//===== middleware to check if user is logged in and authorized =====
	isCommentAuthorized: function (req, res, next) {
		//check if user is logged in
		if (req.isAuthenticated()) {
			Comment.findById(req.params.comment_id, (err, foundComment) => {
				if (err) {
					res.redirect("back");
				}
				else {
					//check if log-in ID equals campground id
					if (foundComment.author.id.equals(req.user._id)) {
						next();
					}
					else {
						res.send("You are not authorized");
					}
				}
			})
		}
		else {
			res.redirect("back");
		}
	},

	//===== middleware to check if user is logged in =====
	isLoggedIn: function (req, res, next) {
		if (req.isAuthenticated()) {
			next();
		}
		else {
			res.redirect("/login");
		}
	},

	//===== middleware to check if user is logged in and authorized =====
	isAuthorized: function (req, res, next) {
		//check if user is logged in
		if (req.isAuthenticated()) {
			campground.findById(req.params.id, (err, foundCampground) => {
				if (err) {
					res.redirect("back");
				}
				else {
					//check if log-in ID equals campground id
					if (foundCampground.author.id.equals(req.user._id)) {
						next();
					}
					else {
						res.send("You are not authorized");
					}
				}
			})
		}
		else {
			res.redirect("back");
		}
	}

}
module.exports = middlewareObj;