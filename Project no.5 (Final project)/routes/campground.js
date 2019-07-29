const express	 = require("express"),
	  router	 = express.Router(),
	  campground = require("../models/campgroundModel"),
	  middleware = require("../middleware")

//SHOW ALL CAMPGROUNDS
router.get("/", (req, res) => {
	campground.find({}, (err, campground) => {
		if (err) {
			console.log("An error was encountered while displaying a new campground")
		}
		else {
			res.render("campgrounds/campground", { campground: campground });
		}
	})
});

//CREATE NEW CAMPGROUNDS
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

router.post("/", middleware.isLoggedIn, (req, res) => {
	var newName = req.body.newName;
	var newImage = req.body.newImage;
	var newDesc = req.body.newDesc;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = { name: newName, image: newImage, desc: newDesc, author: author };
	campground.create(newCampground, (err, newCampground) => {
		if (err) {
			console.log("An error was encountered while creating a new campground");
		}
		else {
			res.redirect("/campgrounds");
		}
	});
});

//Show COMMENTS
router.get("/:id", (req, res) => {
	campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if (err) {
			console.log("An error was encountered");
			console.log(err);
		}
		else {
			res.render("campgrounds/show", { campground: foundCampground });
		}
	});
});

//EDIT page
router.get("/:id/edit", middleware.isAuthorized, (req, res) => {
	campground.findById(req.params.id, (err, foundCampground) => {
		if (err) {
			res.redirect("/");
		}
		else {
			res.render("campgrounds/edit", { campground: foundCampground });
		}
	})
});

//PUT ROUTE for Edit
router.put("/:id", middleware.isAuthorized, (req, res) => {
	campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if (err) {
			res.redirect("back");
		}
		else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})

//DESTROY ROUTE
router.delete("/:id", middleware.isAuthorized, (req, res) => {
	campground.findByIdAndDelete(req.params.id, (err) => {
		if (err) {
			res.redirect("/campgrounds");
		}
		else {
			res.redirect("/campgrounds");
		}
	})
});

module.exports = router;