// packageAndAuthenticityRoutes
// routes/packageAndAuthenticityPageRoutes.js

const express = require("express");
const router = express.Router();
const {
  getPackageAndAuthenticityPageById,
  createPackageAndAuthenticityPage,
  updatePackageAndAuthenticityPageById,
  getPackageAndAuthenticityPageByIdGm,
} = require("../../controllers/pageContollers/PackageAndAuthenticityPageController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get packageAndAuthenticityPage entry by id
router
  .route("/packageAndAuthenticityPage")
  .get(protect, admin, getPackageAndAuthenticityPageById);

router
  .route("/packageAndAuthenticityPage/gm")
  .get(getPackageAndAuthenticityPageByIdGm);

// Create packageAndAuthenticityPage entry
router
  .route("/packageAndAuthenticityPage")
  .post(protect, admin, createPackageAndAuthenticityPage);

// Update packageAndAuthenticityPage entry by id
router
  .route("/packageAndAuthenticityPage/:id")
  .put(protect, admin, updatePackageAndAuthenticityPageById);

module.exports = router;
