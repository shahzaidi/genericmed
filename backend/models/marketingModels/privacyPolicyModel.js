// models/PrivacyPolicy.js
const mongoose = require("mongoose");

const privacyPolicySchema = new mongoose.Schema({
  metaTitle: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  metaKeyword: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PrivacyPolicy", privacyPolicySchema);
