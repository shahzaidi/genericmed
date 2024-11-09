// models/FaqsPage.js
const mongoose = require("mongoose");

const faqsPageSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("FaqsPage", faqsPageSchema);
