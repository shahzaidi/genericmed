// routes/faqsPageRoutes.js

const express = require("express");
const router = express.Router();
const {
  getFaqsPageById,
  createFaqsPage,
  updateFaqsPageById,
  getAllFaqs,
  deleteFaqById,
  getAllFaqsPages,
  getFaqsPageByIdGm,
  getAllFaqsPagesGm,
} = require("../../controllers/pageContollers/faqsPageController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get faqsPage entry by id
router.route("/faqsPage/:id").get(protect, admin, getFaqsPageById);

router.route("/faqsPage/:id/gm").get(getFaqsPageByIdGm);

// Get All faqsPages
router.route("/faqsPage/all").get(protect, admin, getAllFaqsPages);

router.route("/faqsPage/all/gm").get(getAllFaqsPagesGm);

// Create faqsPage entry
router.route("/faqsPage").post(protect, admin, createFaqsPage);

// Create faqsPage entry
router.route("/getAllFaqs").get(protect, admin, getAllFaqs);

// Update faqsPage entry by id
router.route("/faqsPage/:id").put(protect, admin, updateFaqsPageById);

// Update faqsPage entry by id
router.route("/faqsPage/:id").delete(protect, admin, deleteFaqById);

// Create faqsPage entry
router.route("/faqs/getAllFaqs").get(getAllFaqs);

// Update faqsPage entry by id
router.route("/faq/faqsPage/:id").get(getFaqsPageById);

module.exports = router;
