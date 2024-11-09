const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  couponName: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  minimumPurchasePrice: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  maxDiscountAmount: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
});

module.exports = mongoose.model("CouponCode", couponCodeSchema);
