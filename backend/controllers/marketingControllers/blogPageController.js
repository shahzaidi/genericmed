// controllers/blogPageController.js

const BlogPage = require("../../models/marketingModels/blogPageModel");

// Get blogPage entry by id
const getBlogPageById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readBlogDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readBlogDg) {
      const blogPage = await BlogPage.findOne().sort({ createdAt: -1 });
      if (!blogPage) {
        return res.status(404).json({ success: true, blogPage: {} });
      }
      res.status(200).json({ success: true, blogPage });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getBlogPageByIdGm = async (req, res) => {
  try {
    const blogPage = await BlogPage.findOne().sort({ createdAt: -1 });
    if (!blogPage) {
      return res
        .status(404)
        .json({ success: false, message: "Entry not found" });
    }
    res.status(200).json({ success: true, blogPage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create blogPage entry
const createBlogPage = async (req, res) => {
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].createBlogDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createBlogDg) {
      const blogPage = new BlogPage({
        metaTitle,
        metaDescription,
        metaKeyword,
        slug,
      });

      await blogPage.save();
      res.status(201).json({
        success: true,
        blogPage,
        message: "Blog created successfully",
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update blogPage entry by id
const updateBlogPageById = async (req, res) => {
  const { id } = req.params;
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].updateBlogDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateBlogDg) {
      const blogPage = await BlogPage.findByIdAndUpdate(
        id,
        {
          metaTitle,
          metaDescription,
          metaKeyword,
          slug,
        },
        { new: true }
      );

      if (!blogPage) {
        return res
          .status(404)
          .json({ success: false, message: "BlogPage entry not found" });
      }

      res.status(200).json({
        success: true,
        message: "Blog page data updated successfully",
        blogPage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getBlogPageById,
  createBlogPage,
  updateBlogPageById,
  getBlogPageByIdGm,
};
