// controllers/shopAllController.js

const ShopAll = require("../../models/marketingModels/shopAllModel");

// Get shopAll entry by id
const getShopAllById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readShopAllDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readShopAllDg) {
      const shopAll = await ShopAll.findOne().sort({ createdAt: -1 });
      if (!shopAll) {
        return res.status(404).json({ success: true, shopAll: {} });
      }
      res.status(200).json({ success: true, shopAll });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getShopAllByIdGm = async (req, res) => {
  try {
    const shopAll = await ShopAll.findOne().sort({ createdAt: -1 });
    if (!shopAll) {
      return res
        .status(404)
        .json({ success: false, message: "ShopAll entry not found" });
    }
    res.status(200).json({ success: true, shopAll });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create shopAll entry
const createShopAll = async (req, res) => {
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].createShopAllDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createShopAllDg) {
      const shopAll = new ShopAll({
        metaTitle,
        metaDescription,
        metaKeyword,
        slug,
      });

      await shopAll.save();
      res.status(201).json({
        success: true,
        shopAll,
        message: "Shop all created successfully",
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update shopAll entry by id
const updateShopAllById = async (req, res) => {
  const { id } = req.params;
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].updateShopAllDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateShopAllDg) {
      const shopAll = await ShopAll.findByIdAndUpdate(
        id,
        {
          metaTitle,
          metaDescription,
          metaKeyword,
          slug,
        },
        { new: true }
      );

      if (!shopAll) {
        return res.status(404).json({ message: "ShopAll entry not found" });
      }

      res.status(200).json({
        success: true,
        message: "Shop all page data updated successfully",
        shopAll,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getShopAllById,
  createShopAll,
  updateShopAllById,
  getShopAllByIdGm,
};
