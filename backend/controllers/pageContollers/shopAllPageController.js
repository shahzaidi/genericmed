// controllers/shopAllPageController.js
const ShopAllPage = require("../../models/pageModels/shopAllPageModel");

// Get shopAllPage entry by id
const getShopAllPageById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readShopAllPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readShopAllPg) {
      const shopAllPage = await ShopAllPage.findOne().sort({
        createdAt: -1,
      });
      if (!shopAllPage) {
        return res.status(404).json({ success: true, shopAllPage: {} });
      }
      res.status(200).json({ success: true, shopAllPage });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getShopAllPageByIdGm = async (req, res) => {
  try {
    const shopAllPage = await ShopAllPage.findOne().sort({
      createdAt: -1,
    });
    if (!shopAllPage) {
      return res
        .status(404)
        .json({ success: false, message: "Entry not found" });
    }
    res.status(200).json({ success: true, shopAllPage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create shopAllPage entry
const createShopAllPage = async (req, res) => {
  const { sliderBannerImageUrl } = req.body;

  try {
    if (!req.user.permissions[0].createShopAllPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createShopAllPg) {
      const shopAllPage = new ShopAllPage({
        sliderBannerImageUrl,
      });

      await shopAllPage.save();
      res.status(200).json({
        success: true,
        shopAllPage,
        message: "Shop all page banner created successfully",
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update shopAllPage entry by id
const updateShopAllPageById = async (req, res) => {
  const { id } = req.params;
  const { sliderBannerImageUrl } = req.body;

  try {
    if (!req.user.permissions[0].updateShopAllPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateShopAllPg) {
      const shopAllPage = await ShopAllPage.findByIdAndUpdate(
        id,
        {
          sliderBannerImageUrl,
        },
        { new: true }
      );

      if (!shopAllPage) {
        return res
          .status(404)
          .json({ success: false, message: "ShopAllPage entry not found" });
      }

      res.status(200).json({
        success: true,
        message: "Shop all page banner updated successfully",
        shopAllPage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getShopAllPageById,
  createShopAllPage,
  updateShopAllPageById,
  getShopAllPageByIdGm,
};
