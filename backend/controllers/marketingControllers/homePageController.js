// controllers/homePageController.js

const HomePage = require("../../models/marketingModels/homePageModel");

// Get homePage entry by id
const getHomePageById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readHomePageDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readHomePageDg) {
      const homePage = await HomePage.findOne().sort({ createdAt: -1 });
      if (!homePage) {
        return res.status(404).json({ success: true, homePage: {} });
      }
      res.status(200).json({ success: true, homePage });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getHomePageByIdGm = async (req, res) => {
  try {
    const homePage = await HomePage.findOne().sort({ createdAt: -1 });
    if (!homePage) {
      return res.status(404).json({ message: "HomePage entry not found" });
    }
    res.status(200).json({ success: true, homePage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create homePage entry
const createHomePage = async (req, res) => {
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].createHomePageDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createHomePageDg) {
      const homePage = new HomePage({
        metaTitle,
        metaDescription,
        metaKeyword,
        slug,
      });

      await homePage.save();
      res.status(200).json({
        success: true,
        homePage,
        message: "Home page data created successfully",
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update homePage entry by id
const updateHomePageById = async (req, res) => {
  const { id } = req.params;
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].updateHomePageDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateHomePageDg) {
      const homePage = await HomePage.findByIdAndUpdate(
        id,
        {
          metaTitle,
          metaDescription,
          metaKeyword,
          slug,
        },
        { new: true }
      );

      if (!homePage) {
        return res.status(404).json({ message: "HomePage entry not found" });
      }

      res.status(200).json({
        success: true,
        message: "Home page data updated successfully",
        homePage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getHomePageById,
  createHomePage,
  updateHomePageById,
  getHomePageByIdGm,
};
