const CouponCode = require("../models/couponCodeModel");
const mongoose = require("mongoose");

const createCouponCode = async (req, res) => {
  const {
    couponName,
    code,
    minimumPurchasePrice,
    discountPercentage,
    maxDiscountAmount,
    expirationDate,
    startDate,
    status,
  } = req.body;

  try {
    if (!req.user.permissions[0].createCoupons) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createCoupons) {
      const couponCode = new CouponCode({
        couponName,
        code,
        minimumPurchasePrice,
        discountPercentage,
        maxDiscountAmount,
        expirationDate,
        startDate,
        status,
      });
      await couponCode.save();
      res.status(201).json({
        success: true,
        message: "Coupon code created successfully.",
        couponCode,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating coupon code.",
      error: error.message,
    });
  }
};

const applyCouponCode = async (req, res) => {
  const { code, orderTotal } = req.body; // Assuming the total amount of the order is also sent

  try {
    if (!code) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide coupon code." });
    }
    const couponCode = await CouponCode.findOne({
      code: code,
      status: "Active",
      expirationDate: { $gte: new Date() },
    });

    if (!couponCode) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired discount code." });
    }

    // Calculate the discount
    let discountAmount = (orderTotal * couponCode.discountPercentage) / 100;
    // Ensure discount does not exceed the maximum discount amount
    discountAmount = Math.min(discountAmount, couponCode.maxDiscountAmount);

    // Apply the discount logic here
    const finalTotal = orderTotal - discountAmount;

    if (finalTotal) {
      return res.json({
        message: "Coupon applied successfully.",
        originalTotal: orderTotal,
        discountAmount: discountAmount,
        finalTotal: finalTotal,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const validateCouponCode = async (req, res) => {
  const { code } = req.body;

  try {
    const couponCode = await CouponCode.findOne({
      code: code,
      isActive: true,
      expirationDate: { $gte: new Date() },
    });

    if (!couponCode) {
      return res.status(404).json({
        success: false,
        message: "Discount code is invalid or expired.",
      });
    }

    res.json({ message: "Discount code is valid.", couponCode });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error validating discount code.",
      error: error.message,
    });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    if (!req.user.permissions[0].readCoupons) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readCoupons) {
      let limit = Number(10);
      let currentPage = Number(req.query.page);
      let skip = Number(limit * (currentPage - 1));
      const coupons = await CouponCode.find({}).limit(limit).skip(skip);
      const couponsCount = await CouponCode.find({}).countDocuments();
      res.status(200).json({ success: true, coupons, couponsCount });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllCouponsGm = async (req, res) => {
  try {
    const coupons = await CouponCode.find();
    res.status(200).json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteCouponCode = async (req, res) => {
  const { id } = req.query;
  try {
    if (!req.user.permissions[0].deleteCoupons) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].deleteCoupons) {
      const coupon = await CouponCode.findByIdAndDelete(id);
      if (!coupon) {
        return res
          .status(404)
          .json({ success: false, message: "Coupon not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "Coupon deleted successfully" });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deactivateCouponCode = async (req, res) => {
  const { id } = req.query;
  try {
    if (!req.user.permissions[0].updateCoupons) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateCoupons) {
      const coupon = await CouponCode.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );
      if (!coupon) {
        return res
          .status(404)
          .json({ success: false, message: "Coupon not found" });
      }
      res.json({ message: "Coupon deactivated successfully", coupon });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createCouponCode,
  applyCouponCode,
  validateCouponCode,
  getAllCoupons,
  deleteCouponCode,
  deactivateCouponCode,
  getAllCouponsGm,
};
