// routes/privacyPolicyRoutes.js

const express = require("express");
const router = express.Router();
const {
  getPrivacyPolicyById,
  createPrivacyPolicy,
  updatePrivacyPolicyById,
  getPrivacyPolicyByIdGm,
} = require("../../controllers/marketingControllers/privacyPolicyController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get privacyPolicy entry by id
router.route("/privacyPolicy").get(protect, admin, getPrivacyPolicyById);

router.route("/privacyPolicy/gm").get(getPrivacyPolicyByIdGm);

// Create privacyPolicy entry
router.route("/privacyPolicy").post(protect, admin, createPrivacyPolicy);

// Update privacyPolicy entry by id
router.route("/privacyPolicy/:id").put(protect, admin, updatePrivacyPolicyById);

module.exports = router;
