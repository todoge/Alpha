const mongoose = require("mongoose");
//Set up schema
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	desc: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username:String
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}]
});
//compile schema
module.exports = mongoose.model("campground", campgroundSchema);