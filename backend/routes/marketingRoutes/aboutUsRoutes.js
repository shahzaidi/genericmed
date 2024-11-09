// routes/aboutUsRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAboutUsById,
  createAboutUs,
  updateAboutUsById,
  getAboutUsByIdGm,
} = require("../../controllers/marketingControllers/aboutUsController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get aboutUs entry by id
router.route("/aboutUs").get(protect, admin, getAboutUsById);
router.route("/aboutUs/gm").get(getAboutUsByIdGm);

// Create aboutUs entry
router.route("/aboutUs").post(protect, admin, createAboutUs);

// Update aboutUs entry by id
router.route("/aboutUs/:id").put(protect, admin, updateAboutUsById);

module.exports = router;
