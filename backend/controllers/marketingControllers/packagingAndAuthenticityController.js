// controllers/packagingAndAuthenticityController.js

const PackagingAndAuthenticity = require("../../models/marketingModels/packagingAndAuthenticityModel");

// Get packagingAndAuthenticity entry by id
const getPackagingAndAuthenticityById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readPackagingAndAuthenticationDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readPackagingAndAuthenticationDg) {
      const packagingAndAuthenticity =
        await PackagingAndAuthenticity.findOne().sort({ createdAt: -1 });
      if (!packagingAndAuthenticity) {
        return res.status(404).json({
          success: true,
          packagingAndAuthenticity: {},
        });
      }
      res.status(200).json({ success: true, packagingAndAuthenticity });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPackagingAndAuthenticityByIdGm = async (req, res) => {
  try {
    const packagingAndAuthenticity =
      await PackagingAndAuthenticity.findOne().sort({ createdAt: -1 });
    if (!packagingAndAuthenticity) {
      return res.status(404).json({
        success: false,
        message: "PackagingAndAuthenticity entry not found",
      });
    }
    res.status(200).json({ success: true, packagingAndAuthenticity });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create packagingAndAuthenticity entry
const createPackagingAndAuthenticity = async (req, res) => {
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].createPackagingAndAuthenticationDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createPackagingAndAuthenticationDg) {
      const packagingAndAuthenticity = new PackagingAndAuthenticity({
        metaTitle,
        metaDescription,
        metaKeyword,
        slug,
      });

      await packagingAndAuthenticity.save();
      res.status(200).json({
        success: true,
        message: "Package and authenticity created successfully",
        packagingAndAuthenticity,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update packagingAndAuthenticity entry by id
const updatePackagingAndAuthenticityById = async (req, res) => {
  const { id } = req.params;
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].updatePackagingAndAuthenticationDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updatePackagingAndAuthenticationDg) {
      const packagingAndAuthenticity =
        await PackagingAndAuthenticity.findByIdAndUpdate(
          id,
          {
            metaTitle,
            metaDescription,
            metaKeyword,
            slug,
          },
          { new: true }
        );

      if (!packagingAndAuthenticity) {
        return res.status(404).json({
          success: false,
          message: "PackagingAndAuthenticity entry not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Package & authenticity page data updated successfully",
        packagingAndAuthenticity,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getPackagingAndAuthenticityById,
  createPackagingAndAuthenticity,
  updatePackagingAndAuthenticityById,
  getPackagingAndAuthenticityByIdGm,
};
