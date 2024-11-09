// routes/contactUsRoutes.js

const express = require("express");
const router = express.Router();
const {
  getContactUsById,
  createContactUs,
  updateContactUsById,
  getContactUsByIdGm,
} = require("../../controllers/marketingControllers/contactUsController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get contactUs entry by id
router.route("/contactUs").get(protect, admin, getContactUsById);
router.route("/contactUs/gm").get(getContactUsByIdGm);

// Get contactUs entry by id
router.route("/contactUs/gm").get(getContactUsById);

// Create contactUs entry
router.route("/contactUs").post(protect, admin, createContactUs);

// Update contactUs entry by id
router.route("/contactUs/:id").put(protect, admin, updateContactUsById);

module.exports = router;
