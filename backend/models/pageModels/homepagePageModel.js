// models/HomepagePage.js
const mongoose = require("mongoose");

const homepagePageSchema = new mongoose.Schema({
  sliderBannerImageUrl: {
    type: Array,
    required: true,
  },
  imageUrlOne: {
    type: String,
    required: true,
  },
  imageUrlTwo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("HomepagePage", homepagePageSchema);
