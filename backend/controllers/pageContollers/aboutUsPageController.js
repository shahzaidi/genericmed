// controllers/aboutUsPageController.js
const AboutUsPage = require("../../models/pageModels/aboutUsPageModel");

// Get aboutUsPage entry by id
const getAboutUsPageById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readAboutUsPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readAboutUsPg) {
      const aboutUsPage = await AboutUsPage.findOne().sort({ createdAt: -1 });
      if (!aboutUsPage) {
        return res.status(404).json({ success: true, aboutUsPage: {} });
      }
      res.status(200).json({ success: true, aboutUsPage });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAboutUsPageByIdGm = async (req, res) => {
  try {
    const aboutUsPage = await AboutUsPage.findOne().sort({ createdAt: -1 });
    if (!aboutUsPage) {
      return res
        .status(404)
        .json({ success: false, message: "AboutUsPage entry not found" });
    }
    res.status(200).json({ success: true, aboutUsPage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create aboutUsPage entry
const createAboutUsPage = async (req, res) => {
  const { imageUrl, description } = req.body;

  try {
    if (!req.user.permissions[0].createAboutUsPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createAboutUsPg) {
      const aboutUsPage = new AboutUsPage({
        imageUrl,
        description,
      });

      await aboutUsPage.save();
      res.status(200).json({
        success: true,
        message: "About us page data created successfully",
        aboutUsPage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update aboutUsPage entry by id
const updateAboutUsPageById = async (req, res) => {
  const { id } = req.params;
  const { imageUrl, description } = req.body;

  try {
    if (!req.user.permissions[0].updateAboutUsPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateAboutUsPg) {
      const aboutUsPage = await AboutUsPage.findByIdAndUpdate(
        id,
        {
          imageUrl,
          description,
        },
        { new: true }
      );

      if (!aboutUsPage) {
        return res
          .status(404)
          .json({ success: false, message: "AboutUsPage entry not found" });
      }

      res.status(200).json({
        success: true,
        message: "About us page data updated successfully",
        aboutUsPage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAboutUsPageById,
  createAboutUsPage,
  updateAboutUsPageById,
  getAboutUsPageByIdGm,
};
