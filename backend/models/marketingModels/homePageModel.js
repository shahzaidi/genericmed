// models/Homepage.js

const mongoose = require("mongoose");

const homepageSchema = new mongoose.Schema({
  metaTitle: {
    type: String,
    required: [true, "Homepage meta title is required"],
  },
  metaDescription: {
    type: String,
    required: [true, "Homepage meta description is required"],
  },
  metaKeyword: {
    type: String,
    required: [true, "Homepage meta keyword is required"],
  },
  slug: {
    type: String,
    required: [true, "Homepage slug is required"],
  },
});

module.exports = mongoose.model("Homepage", homepageSchema);
