// controllers/categoryPageController.js

const CategoryPage = require("../../models/marketingModels/categoryPageModel");

// Get categoryPage entry by id
const getCategoryPageById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readCategories) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readCategories) {
      const categoryPage = await CategoryPage.findOne().sort({ createdAt: -1 });
      if (!categoryPage) {
        return res.status(404).json({ success: true, categoryPage: {} });
      }
      res.status(200).json({ success: true, categoryPage });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCategoryPageByIdGm = async (req, res) => {
  try {
    const categoryPage = await CategoryPage.findOne().sort({ createdAt: -1 });
    if (!categoryPage) {
      return res
        .status(404)
        .json({ success: false, message: "CategoryPage entry not found" });
    }
    res.status(200).json({ success: true, categoryPage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create categoryPage entry
const createCategoryPage = async (req, res) => {
  const { metaTitle, metaDescription, metaKeyword, slug, category } = req.body;

  try {
    if (!req.user.permissions[0].createCategories) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createCategories) {
      const categoryPage = new CategoryPage({
        category,
        metaTitle,
        metaDescription,
        metaKeyword,
        slug,
      });

      await categoryPage.save();
      res.status(200).json({
        success: true,
        message: "Category page data created successfully",
        categoryPage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update categoryPage entry by id
const updateCategoryPageById = async (req, res) => {
  const { id } = req.params;
  const { metaTitle, metaDescription, metaKeyword, slug, category } = req.body;

  try {
    if (!req.user.permissions[0].updateCategories) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateCategories) {
      const categoryPage = await CategoryPage.findByIdAndUpdate(
        id,
        {
          category,
          metaTitle,
          metaDescription,
          metaKeyword,
          slug,
        },
        { new: true }
      );

      if (!categoryPage) {
        return res
          .status(404)
          .json({ success: false, message: "CategoryPage entry not found" });
      }

      res.status(200).json({
        success: true,
        message: "Category page data updated successfully",
        categoryPage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getCategoryPageById,
  createCategoryPage,
  updateCategoryPageById,
  getCategoryPageByIdGm,
};
