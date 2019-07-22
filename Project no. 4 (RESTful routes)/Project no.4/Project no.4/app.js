const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var blog = require("./models/blog")
app.set("view engine", "ejs");
mongoose.set("useFindAndModify", false );
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });

app.get("/blogs", (req, res) => {
	blog.find({}, (err, blogs) => {
		if (err) {
			console.log("An error was encountered while loading blogs");
		}
		else {
			res.render("home", { blogs: blogs });
		}
	})
})
app.get("/", (req, res) => {
	res.redirect("/blogs");
})
app.get("/blogs/new", (req, res) => {
	res.render("new");
})

app.post("/blogs", (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	blog.create(req.body.blog, (err, newBlog) => {
		if (err) {
			res.redirect("/blogs/new");
			alert("An error occurred while creating the blog");
		}
		else {
			res.redirect("/blogs");
		}
	});
})

app.get("/blogs/:id", (req, res) => {
	blog.findById(req.params.id, (err, selectedBlog) => {
		if (err) {
			res.redirect("/");
		}
		else {
			res.render("show", { blog: selectedBlog });
		}
	});
})
app.get("/blogs/:id/edit", (req, res) => {
	blog.findById(req.params.id, (err, selectedBlog) => {
		if (err) {
			res.redirect("/");
		}
		else {
			res.render("update", { blog: selectedBlog });
		}
	});
})

app.put("/blogs/:id", (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
		if (err) {
			res.redirect("/blogs");
		}
		else {
			res.redirect("/blogs/" + req.params.id);
		}
	})
})
app.delete("/blogs/:id", (req, res) => {
	blog.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			res.redirect("/");
		}
		else {
			res.redirect("/");
		}
	})
})
app.listen("3000", "127.0.0.1", function () {
	console.log("server is running");
})
