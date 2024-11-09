// routes/homePageRoutes.js

const express = require("express");
const router = express.Router();
const {
  getHomePageById,
  createHomePage,
  updateHomePageById,
  getHomePageByIdGm,
} = require("../../controllers/marketingControllers/homePageController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get homePage entry by id
router.route("/homePage").get(protect, admin, getHomePageById);
router.route("/homePage/gm").get(getHomePageByIdGm);

// Create homePage entry
router.route("/homePage").post(protect, admin, createHomePage);

// Update homePage entry by id
router.route("/homePage/:id").put(protect, admin, updateHomePageById);

module.exports = router;
