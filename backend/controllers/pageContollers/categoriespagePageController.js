// controllers/categoriespagePageController.js
const CategoriesPagePage = require("../../models/pageModels/categoriespagePageModel");

// Get categoriesPagePage entry by id
const getCategoriesPagePageById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readCategoriesPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readCategoriesPg) {
      const categoriesPagePage = await CategoriesPagePage.findOne().sort({
        cratedAt: -1,
      });
      if (!categoriesPagePage) {
        return res.status(404).json({
          success: true,
          categoriesPagePage: {},
        });
      }
      res.status(200).json({ success: true, categoriesPagePage });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCategoriesPagePageByIdGm = async (req, res) => {
  try {
    const categoriesPagePage = await CategoriesPagePage.findOne().sort({
      cratedAt: -1,
    });
    if (!categoriesPagePage) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }
    res.status(200).json({ success: true, categoriesPagePage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create categoriesPagePage entry
const createCategoriesPagePage = async (req, res) => {
  const { sliderBannerImageUrl } = req.body;

  try {
    if (!req.user.permissions[0].createCategoriesPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createCategoriesPg) {
      const categoriesPagePage = new CategoriesPagePage({
        sliderBannerImageUrl,
      });

      await categoriesPagePage.save();
      res.status(200).json({
        success: true,
        message: "Category page data created successfully",
        categoriesPagePage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update categoriesPagePage entry by id
const updateCategoriesPagePageById = async (req, res) => {
  const { id } = req.params;
  const { sliderBannerImageUrl } = req.body;

  try {
    if (!req.user.permissions[0].updateCategoriesPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateCategoriesPg) {
      const categoriesPagePage = await CategoriesPagePage.findByIdAndUpdate(
        id,
        {
          sliderBannerImageUrl,
        },
        { new: true }
      );

      if (!categoriesPagePage) {
        return res.status(404).json({
          success: false,
          message: "CategoriespagePage entry not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Category page data updated successfully",
        categoriesPagePage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getCategoriesPagePageById,
  createCategoriesPagePage,
  updateCategoriesPagePageById,
  getCategoriesPagePageByIdGm,
};
