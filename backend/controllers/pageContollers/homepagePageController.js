// controllers/homepagePageController.js
const HomepagePage = require("../../models/pageModels/homepagePageModel");

// Get homepagePage entry by id
const getHomepagePageById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readHomePagePg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readHomePagePg) {
      const homepagePage = await HomepagePage.findOne().sort({
        createdAt: -1,
      });
      if (!homepagePage) {
        return res.status(404).json({ success: true, homepagePage: {} });
      }
      res.status(200).json({ success: true, homepagePage });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getHomepagePageByIdGm = async (req, res) => {
  try {
    const homepagePage = await HomepagePage.findOne().sort({
      createdAt: -1,
    });
    if (!homepagePage) {
      return res
        .status(404)
        .json({ success: false, message: "HomepagePage entry not found" });
    }
    res.status(200).json({ success: true, homepagePage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create homepagePage entry
const createHomepagePage = async (req, res) => {
  const { sliderBannerImageUrl, imageUrlOne, imageUrlTwo } = req.body;

  try {
    if (!req.user.permissions[0].createHomePagePg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createHomePagePg) {
      const homepagePage = new HomepagePage({
        sliderBannerImageUrl,
        imageUrlOne,
        imageUrlTwo,
      });

      await homepagePage.save();
      res.status(200).json({
        success: true,
        message: "Home page banners created successfully",
        homepagePage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update homepagePage entry by id
const updateHomepagePageById = async (req, res) => {
  const { id } = req.params;
  const { sliderBannerImageUrl, imageUrlOne, imageUrlTwo } = req.body;

  try {
    if (!req.user.permissions[0].updateHomePagePg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateHomePagePg) {
      const homepagePage = await HomepagePage.findByIdAndUpdate(
        id,
        {
          sliderBannerImageUrl,
          imageUrlOne,
          imageUrlTwo,
        },
        { new: true }
      );

      if (!homepagePage) {
        return res
          .status(404)
          .json({ success: false, message: "HomepagePage entry not found" });
      }

      res.status(200).json({
        success: true,
        message: "Home page banners updated successfully",
        homepagePage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getHomepagePageById,
  createHomepagePage,
  updateHomepagePageById,
  getHomepagePageByIdGm,
};
