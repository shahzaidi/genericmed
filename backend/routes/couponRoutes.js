const express = require("express");
const {
  createCouponCode,
  applyCouponCode,
  validateCouponCode,
  getAllCoupons,
  deleteCouponCode,
  deactivateCouponCode,
  getAllCouponsGm,
} = require("../controllers/couponController");

const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create and manage discount codes
router.post("/coupons/create", protect, admin, createCouponCode);

// Apply discounts/coupons to orders - This is just a placeholder, integration with orders needs to be implemented
router.post("/coupons/apply", protect, applyCouponCode);

// Validate discount codes - This could be a middleware or a separate route depending on your design
router.post("/coupons/validate", validateCouponCode);

// Get all codes - This could be a middleware or a separate route depending on your design
router.get("/coupons/getAll", protect, admin, getAllCoupons);
router.get("/coupons/getAll/gm", getAllCouponsGm);

//Delete coupon codes
router.delete("/coupons/delete", protect, admin, deleteCouponCode);

//update coupon status
router.put("/coupons/update/:id", protect, admin, deactivateCouponCode);

module.exports = router;
