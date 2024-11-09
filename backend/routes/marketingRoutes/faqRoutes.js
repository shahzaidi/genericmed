// routes/faqRoutes.js

const express = require("express");
const router = express.Router();
const {
  getFaqById,
  createFaq,
  updateFaqById,
  getFaqByIdGm,
} = require("../../controllers/marketingControllers/faqController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get faq entry by id
router.route("/faq").get(protect, admin, getFaqById);
router.route("/faq/gm").get(getFaqByIdGm);

// Create faq entry
router.route("/faq").post(protect, admin, createFaq);

// Update faq entry by id
router.route("/faq/:id").put(protect, admin, updateFaqById);

module.exports = router;
