const mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
	title: String,
	image: { type: String, default: "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png" },
	body: String,
	created: { type: Date, default: Date.now }
})
module.exports = mongoose.model("blog", blogSchema);
