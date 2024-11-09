const express = require("express");
const router = express.Router();
const {
  calculateOrderTotal,
  applyDiscount,
  processPayment,
  generateInvoice,
} = require("../controllers/checkoutController");

const { protect } = require("../middlewares/authMiddleware");

// Calculate order total
router.post("/calculateOrderTotal", calculateOrderTotal);

// Apply discounts or coupons
router.post("/apply-discount", applyDiscount);

// Process payment
router.post("/process/payment", processPayment);

// Generate invoice or receipt
router.post("/generate/invoice", protect, generateInvoice);

module.exports = router;
