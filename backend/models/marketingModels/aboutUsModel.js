// models/AboutUs.js
const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
  metaTitle: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  metaKeyword: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AboutUs", aboutUsSchema);
