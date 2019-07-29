//Require frameworks and libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

//Using frameworks
const app = express();
app.use(methodOverride("_method"));

//Use BODY-PARSER to collect information from forms
app.use(bodyParser.urlencoded({ extended: true }));

//Require Models
const campground = require("./models/campgroundModel");
const Comment = require("./models/commentsModel");
const User = require("./models/userModel");

//Require PASSPORT and dependencies
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

//Serving public directory for assets
app.use(express.static(__dirname + "/public"));

//CREATING yelp_camp MONGODB database
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

//REQUIRE ROUTES
var campgroundRoute = require("./routes/campground");
var commentsRoute = require("./routes/comments");
var authRoute = require("./routes/index");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "apple sauce",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to allow Currentuser to be called on every route
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

//Setting VIEWS DIRECTORY to use ejs template
app.set("view engine", "ejs");

//Seeding database with new data
/*var seedDB = require("./seed");
seedDB();*/

//USING ROUTES
app.use("/campgrounds",campgroundRoute);
app.use("/campgrounds/:id/comments",commentsRoute);
app.use(authRoute);

//Serving port 3000
app.listen(process.env.PORT || 3000, process.env.IP, (serverStatus) => {
	console.log("Server is up!");
});
