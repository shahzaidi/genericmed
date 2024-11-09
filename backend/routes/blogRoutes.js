// routes/blogRoutes.js

const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getLatestFourBlogs,
  getAllBlogsGm,
  getBlogByIdGm,
} = require("../controllers/blogController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a new blog
router.route("/blog/new").post(protect, admin, createBlog);

// Get all blogs
router.route("/blog/getAll").get(protect, admin, getAllBlogs);

router.route("/blog/getAll/gm").get(getAllBlogsGm);

// Get latest four blog posts
router.route("/blog/getLatestBlogs").get(getLatestFourBlogs);

// Get a single blog by ID
router.route("/get/blog/details").get(protect, admin, getBlogById);
router.route("/get/blog/details/gm").get(getBlogByIdGm);

// // Get a single blog by ID
// router.route("/get/blog/details/gm").get(getBlogById);

// Update a blog by ID
router.route("/blog/update").put(protect, admin, updateBlog);

// Delete a blog by ID
router.route("/blogs/delete").delete(protect, admin, deleteBlog);

module.exports = router;
