// routes/categoryPageRoutes.js

const express = require("express");
const router = express.Router();
const {
  getCategoryPageById,
  createCategoryPage,
  updateCategoryPageById,
  getCategoryPageByIdGm,
} = require("../../controllers/marketingControllers/categoryPageController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get categoryPage entry by id
router.route("/categoryPage").get(protect, admin, getCategoryPageById);
router.route("/categoryPage/gm").get(getCategoryPageByIdGm);

// Create categoryPage entry
router.route("/categoryPage").post(protect, admin, createCategoryPage);

// Update categoryPage entry by id
router.route("/categoryPage/:id").put(protect, admin, updateCategoryPageById);

module.exports = router;
