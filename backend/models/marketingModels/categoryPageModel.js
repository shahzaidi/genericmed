// models/CategoryPage.js
const mongoose = require("mongoose");

const categoryPageSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  metaTitle: {
    type: String,
    required: [true, "CategoryPage meta title is required"],
  },
  metaDescription: {
    type: String,
    required: [true, "CategoryPage meta description is required"],
  },
  metaKeyword: {
    type: String,
    required: [true, "CategoryPage meta keyword is required"],
  },
  slug: {
    type: String,
    required: [true, "CategoryPage slug is required"],
  },
});

module.exports = mongoose.model("CategoryPage", categoryPageSchema);
