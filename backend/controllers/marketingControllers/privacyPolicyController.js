// controllers/privacyPolicyController.js
const PrivacyPolicy = require("../../models/marketingModels/privacyPolicyModel");

// Get privacyPolicy entry by id
const getPrivacyPolicyById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readPrivacyPolicyDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readPrivacyPolicyDg) {
      const privacyPolicy = await PrivacyPolicy.findOne().sort({
        createdAt: -1,
      });
      if (!privacyPolicy) {
        return res.status(404).json({
          success: true,
          privacyPolicy: {},
        });
      }
      res.status(200).json({
        success: true,

        privacyPolicy,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPrivacyPolicyByIdGm = async (req, res) => {
  try {
    const privacyPolicy = await PrivacyPolicy.findOne().sort({
      createdAt: -1,
    });
    if (!privacyPolicy) {
      return res.status(404).json({ message: "PrivacyPolicy entry not found" });
    }
    res.status(200).json({
      success: true,

      privacyPolicy,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create privacyPolicy entry
const createPrivacyPolicy = async (req, res) => {
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].createPrivacyPolicyDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createPrivacyPolicyDg) {
      const privacyPolicy = new PrivacyPolicy({
        metaTitle,
        metaDescription,
        metaKeyword,
        slug,
      });

      await privacyPolicy.save();
      res.status(200).json({
        success: true,
        message: "Privacy policy created successfully",
        privacyPolicy,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update privacyPolicy entry by id
const updatePrivacyPolicyById = async (req, res) => {
  const { id } = req.params;
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].updatePrivacyPolicyDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updatePrivacyPolicyDg) {
      const privacyPolicy = await PrivacyPolicy.findByIdAndUpdate(
        id,
        {
          metaTitle,
          metaDescription,
          metaKeyword,
          slug,
        },
        { new: true }
      );

      if (!privacyPolicy) {
        return res
          .status(404)
          .json({ success: false, message: "PrivacyPolicy entry not found" });
      }

      res.status(200).json({
        success: true,
        message: "Privacy policy page data updated successfully",
        privacyPolicy,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getPrivacyPolicyById,
  createPrivacyPolicy,
  updatePrivacyPolicyById,
  getPrivacyPolicyByIdGm,
};
