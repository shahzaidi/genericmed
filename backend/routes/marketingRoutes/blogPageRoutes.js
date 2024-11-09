// routes/blogPageRoutes.js

const express = require("express");
const router = express.Router();
const {
  getBlogPageById,
  createBlogPage,
  updateBlogPageById,
  getBlogPageByIdGm,
} = require("../../controllers/marketingControllers/blogPageController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get blogPage entry by id
router.route("/blogPage").get(protect, admin, getBlogPageById);
router.route("/blogPage/gm").get(getBlogPageByIdGm);

// Create blogPage entry
router.route("/blogPage").post(protect, admin, createBlogPage);

// Update blogPage entry by id
router.route("/blogPage/:id").put(protect, admin, updateBlogPageById);

module.exports = router;
