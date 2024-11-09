// routes/privacyPolicyPageRoutes.js

const express = require("express");
const router = express.Router();
const {
  getPrivacyPolicyPageById,
  createPrivacyPolicyPage,
  updatePrivacyPolicyPageById,
  getPrivacyPolicyPageByIdGm,
} = require("../../controllers/pageContollers/privacyPolicyPageController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get privacyPolicyPage entry by id
router
  .route("/privacyPolicyPage")
  .get(protect, admin, getPrivacyPolicyPageById);

router.route("/privacyPolicyPage/gm").get(getPrivacyPolicyPageByIdGm);

// Create privacyPolicyPage entry
router
  .route("/privacyPolicyPage")
  .post(protect, admin, createPrivacyPolicyPage);

// Update privacyPolicyPage entry by id
router
  .route("/privacyPolicyPage/:id")
  .put(protect, admin, updatePrivacyPolicyPageById);

module.exports = router;
