const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "please enter email"],
    },

    otp: {
      type: String,
      required: [true, "Otp is required"],
    },

    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },

    isExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Otp = mongoose.model("otp", otpSchema);

module.exports = Otp;
