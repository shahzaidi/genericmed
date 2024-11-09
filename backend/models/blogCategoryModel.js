const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const blogCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "category name is required"],
  },

  image: {
    type: String,
    required: [true, "category image is required"],
  },

  status: {
    type: String,
    required: true,
    default: "Active",
  },
  subcategories: [subcategorySchema],
});

const blogCategory = mongoose.model("blog_category", blogCategorySchema);

module.exports = blogCategory;
