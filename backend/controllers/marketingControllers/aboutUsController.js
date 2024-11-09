// controllers/aboutUsController.js

const AboutUs = require("../../models/marketingModels/aboutUsModel");

// Get aboutUs entry by id
const getAboutUsById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readAboutUsDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readAboutUsDg) {
      const aboutUs = await AboutUs.findOne().sort({ createdAt: -1 });
      if (!aboutUs) {
        return res.status(404).json({ success: true, aboutUs: {} });
      }
      res.status(200).json({ success: true, aboutUs });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAboutUsByIdGm = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne().sort({ createdAt: -1 });
    if (!aboutUs) {
      return res.status(404).json({ message: "AboutUs entry not found" });
    }
    res.status(200).json({ success: true, aboutUs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create aboutUs entry
const createAboutUs = async (req, res) => {
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].createAboutUsDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createAboutUsDg) {
      const aboutUs = new AboutUs({
        metaTitle,
        metaDescription,
        metaKeyword,
        slug,
      });

      await aboutUs.save();
      res.status(201).json({
        success: true,
        aboutUs,
        message: "About us created successfully",
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update aboutUs entry by id
const updateAboutUsById = async (req, res) => {
  const { id } = req.params;
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].updateAboutUsDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateAboutUsDg) {
      const aboutUs = await AboutUs.findByIdAndUpdate(
        id,
        {
          metaTitle,
          metaDescription,
          metaKeyword,
          slug,
        },
        { new: true }
      );

      if (!aboutUs) {
        return res
          .status(404)
          .json({ success: false, message: "AboutUs entry not found" });
      }

      res.status(200).json({
        success: true,
        message: "About us page data updated successfully",
        aboutUs,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAboutUsById,
  createAboutUs,
  updateAboutUsById,
  getAboutUsByIdGm,
};
