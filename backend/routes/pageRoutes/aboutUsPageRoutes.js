// routes/aboutUsPageRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAboutUsPageById,
  createAboutUsPage,
  updateAboutUsPageById,
  getAboutUsPageByIdGm,
} = require("../../controllers/pageContollers/aboutUsPageController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get aboutUsPage entry by id
router.route("/aboutUsPage").get(protect, admin, getAboutUsPageById);
router.route("/aboutUsPage/gm").get(getAboutUsPageByIdGm);

router.route("/page/aboutUsPage").get(protect, admin, getAboutUsPageById);

// Create aboutUsPage entry
router.route("/aboutUsPage").post(protect, admin, createAboutUsPage);

// Update aboutUsPage entry by id
router.route("/aboutUsPage/:id").put(protect, admin, updateAboutUsPageById);

module.exports = router;
