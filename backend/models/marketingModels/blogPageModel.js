// models/BlogPage.js
const mongoose = require("mongoose");

const blogPageSchema = new mongoose.Schema({
  metaTitle: {
    type: String,
    required: [true, "BlogPage meta title is required"],
  },
  metaDescription: {
    type: String,
    required: [true, "BlogPage meta description is required"],
  },
  metaKeyword: {
    type: String,
    required: [true, "BlogPage meta keyword is required"],
  },
  slug: {
    type: String,
    required: [true, "BlogPage slug is required"],
  },
});

module.exports = mongoose.model("BlogPage", blogPageSchema);
