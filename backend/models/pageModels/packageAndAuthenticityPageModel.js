// models/PackageAndAuthenticityPage.js
const mongoose = require("mongoose");

const packageAndAuthenticityPageSchema = new mongoose.Schema({
  termsAndConditions: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "PackageAndAuthenticityPage",
  packageAndAuthenticityPageSchema
);
