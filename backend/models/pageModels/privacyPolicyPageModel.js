// models/PrivacyPolicyPage.js
const mongoose = require("mongoose");

const privacyPolicyPageSchema = new mongoose.Schema({
  privacyPolicy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PrivacyPolicyPage", privacyPolicyPageSchema);
