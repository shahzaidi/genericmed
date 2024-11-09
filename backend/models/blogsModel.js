const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "blog name is required"],
    },

    content: {
      type: String,
      required: [true, "blog content is required"],
    },
    author: {
      type: String,
      required: [true, "blog author is required"],
    },
    slug: {
      type: String,
      required: [true, "blog slug is required"],
    },
    metaTitle: {
      type: String,
      required: [true, "blog mega title is required"],
    },
    metaDescription: {
      type: String,
      required: [true, "blog meta description is required"],
    },
    metaKeyword: {
      type: String,
      required: [true, "blog meta keyword is required"],
    },
    blogImage: {
      type: String,
      required: [true, "blog image Url is required"],
    },
    featuredImage: {
      type: String,
      required: [true, "blog featured image Url is required"],
    },
    status: {
      type: String,
      required: [true, "blog status is required"],
    },
    category: {
      type: String,
      required: [true, "blog category is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
