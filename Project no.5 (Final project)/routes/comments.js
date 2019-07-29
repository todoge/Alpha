const express = require("express");
const router = express.Router({ mergeParams: true });
const campground = require("../models/campgroundModel");
const Comment = require("../models/commentsModel");
const middleware = require("../middleware");

//CREATE COMMENTS ROUTE
router.get("/new", middleware.isLoggedIn, (req, res) => {
	campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log("Campground does not exist");
		}
		else {
			res.render("comments/new", { campground: campground });
		}
	})
});

router.post("/", middleware.isLoggedIn, (req, res) => {
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
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save();
					campgroundFound.comments.push(newComment);
					campgroundFound.save();
					res.redirect("/campgrounds/" + campgroundFound._id);
				}
			})
		}
	})
});

//EDIT COMMENTS ROUTE
router.get("/:comment_id/edit", middleware.isCommentAuthorized, (req, res) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		res.render("comments/edit", { campground_id: req.params.id, comment: foundComment })
	})
});

router.put("/:comment_id", middleware.isCommentAuthorized, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.Comment, (err, updatedComment) => {
		res.redirect("/campgrounds/" + req.params.id);
	})
});

//DELETE COMMENTS ROUTE
router.delete("/:comment_id", middleware.isCommentAuthorized, (req, res) => {
	Comment.findByIdAndDelete(req.params.comment_id, (err) => {
		if (err) {
			res.render("back");
		}
		else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

module.exports = router;