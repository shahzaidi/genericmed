const express = require("express");
const {
  createContactUs,
  getAllContactUs,
  getContactUsById,
  updateContactUs,
  deleteContactUs,
} = require("../controllers/contactUsController");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

// Create contactUs

router.route("/contactUs/new").post(createContactUs);

// Get All contactUs

router.route("/contactUs/getAll").get(protect, admin, getAllContactUs);

// Get contactUs by Id Route
router.route("/contactUs/get").get(protect, getContactUsById);

// Update contactUs Route
router.route("/contactUs/update").put(protect, updateContactUs);

// Delete contactUs Route
router.route("/contactUs/delete").delete(protect, admin, deleteContactUs);

module.exports = router;
