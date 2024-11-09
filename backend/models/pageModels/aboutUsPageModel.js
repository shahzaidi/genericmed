// models/AboutUsPage.js
const mongoose = require("mongoose");

const aboutUsPageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AboutUsPage", aboutUsPageSchema);
