// models/ShopAllPage.js
const mongoose = require("mongoose");

const shopAllPageSchema = new mongoose.Schema({
  sliderBannerImageUrl: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("ShopAllPage", shopAllPageSchema);
