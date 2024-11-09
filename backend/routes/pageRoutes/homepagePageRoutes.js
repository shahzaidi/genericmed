// routes/homepagePageRoutes.js

const express = require("express");
const router = express.Router();
const {
  getHomepagePageById,
  createHomepagePage,
  updateHomepagePageById,
  getHomepagePageByIdGm,
} = require("../../controllers/pageContollers/homepagePageController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get homepagePage entry by id
router.route("/homepagePage").get(protect, admin, getHomepagePageById);
router.route("/homepagePage/gm").get(getHomepagePageByIdGm);
router.route("/home/homepagePage").get(getHomepagePageById);

// Create homepagePage entry
router.route("/homepagePage").post(protect, admin, createHomepagePage);

// Update homepagePage entry by id
router.route("/homepagePage/:id").put(protect, admin, updateHomepagePageById);

module.exports = router;
