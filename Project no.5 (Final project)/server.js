//Require frameworks and libraries
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const campground = require("./models/campgroundModel");
const Comment = require("./models/commentsModel");
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
var seedDB = require("./seed");
seedDB();
//rendering home page
app.get("/", (req, res) => {
	res.render("landing");
});

app.get("/campgrounds/new", (req, res) => {
	res.render("campgrounds/new");
});

app.get("/campgrounds", (req, res) => {
	campground.find({}, (err, campground) => {
		if (err) {
			console.log("An error was encountered while displaying a new campground")
		}
		else {
			res.render("campgrounds/campground", { campground: campground });
		}
	})
});

app.post("/campgrounds", (req, res) => {
	var newName = req.body.newName;
	var newImage = req.body.newImage;
	var newDesc = req.body.newDesc;
	var newCampground = { name: newName, image: newImage, desc: newDesc };
	console.log(newCampground);
	campground.create(newCampground, (err, newCampground) => {
		if (err) {
			console.log("An error was encountered while creating a new campground");
		}
		else {
			res.redirect("/campgrounds");
		}
	});
});
app.get("/campgrounds/:id", (req, res) => {
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
app.get("/campgrounds/:id/comments/new", (req, res) => {
	campground.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log("Campground does not exist");
		}
		else {
			res.render("comments/new", { campground: campground });
		}
	})
})
app.post("/campgrounds/:id/comments", (req, res) => {
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
					campgroundFound.comments.push(newComment);
					campgroundFound.save();
					res.redirect("/campgrounds/" + campgroundFound._id);
				}
			})
		}
	})
})
app.listen("3000", "127.0.0.1", (serverStatus) => {
	console.log("Server is up!");
});
