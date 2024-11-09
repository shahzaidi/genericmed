// routes/packagingAndAuthenticityRoutes.js

const express = require("express");
const router = express.Router();
const {
  getPackagingAndAuthenticityById,
  createPackagingAndAuthenticity,
  updatePackagingAndAuthenticityById,
  getPackagingAndAuthenticityByIdGm,
} = require("../../controllers/marketingControllers/packagingAndAuthenticityController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get packagingAndAuthenticity entry by id
router
  .route("/packagingAndAuthenticity")
  .get(protect, admin, getPackagingAndAuthenticityById);

router
  .route("/packagingAndAuthenticity/gm")
  .get(getPackagingAndAuthenticityByIdGm);

// Create packagingAndAuthenticity entry
router
  .route("/packagingAndAuthenticity")
  .post(protect, admin, createPackagingAndAuthenticity);

// Update packagingAndAuthenticity entry by id
router
  .route("/packagingAndAuthenticity/:id")
  .put(protect, admin, updatePackagingAndAuthenticityById);

module.exports = router;
