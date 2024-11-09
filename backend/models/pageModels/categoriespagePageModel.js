// models/CategoriespagePage.js
const mongoose = require("mongoose");

const categoriesPagePageSchema = new mongoose.Schema({
  sliderBannerImageUrl: {
    type: Array,
    required: [true, "Images are required"],
  },
});

module.exports = mongoose.model("CategoriesPagePage", categoriesPagePageSchema);
