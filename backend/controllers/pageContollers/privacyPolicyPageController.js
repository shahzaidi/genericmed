// controllers/privacyPolicyPageController.js
const PrivacyPolicyPage = require("../../models/pageModels/privacyPolicyPageModel");

// Get privacyPolicyPage entry by id
const getPrivacyPolicyPageById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readPrivacyPolicyPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readPrivacyPolicyPg) {
      const privacyPolicyPage = await PrivacyPolicyPage.findOne().sort({
        createdAt: -1,
      });
      if (!privacyPolicyPage) {
        return res.status(404).json({
          success: true,
          privacyPolicyPage: {},
        });
      }
      res.status(200).json({ success: true, privacyPolicyPage });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPrivacyPolicyPageByIdGm = async (req, res) => {
  try {
    const privacyPolicyPage = await PrivacyPolicyPage.findOne().sort({
      createdAt: -1,
    });
    if (!privacyPolicyPage) {
      return res.status(404).json({
        success: false,
        message: "PrivacyPolicyPage entry not found",
      });
    }
    res.status(200).json({ success: true, privacyPolicyPage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create privacyPolicyPage entry
const createPrivacyPolicyPage = async (req, res) => {
  const { privacyPolicy } = req.body;

  try {
    if (!req.user.permissions[0].createPrivacyPolicyPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createPrivacyPolicyPg) {
      const privacyPolicyPage = new PrivacyPolicyPage({
        privacyPolicy,
      });

      await privacyPolicyPage.save();
      res.status(200).json({
        success: true,
        message: "Privacy and policy page data created successfully",
        privacyPolicyPage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update privacyPolicyPage entry by id
const updatePrivacyPolicyPageById = async (req, res) => {
  const { id } = req.params;
  const { privacyPolicy } = req.body;

  try {
    if (!req.user.permissions[0].updatePrivacyPolicyPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updatePrivacyPolicyPg) {
      const privacyPolicyPage = await PrivacyPolicyPage.findByIdAndUpdate(
        id,
        {
          privacyPolicy,
        },
        { new: true }
      );

      if (!privacyPolicyPage) {
        return res.status(404).json({
          success: false,
          message: "PrivacyPolicyPage entry not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Privacy and policy page data updated successfully",
        privacyPolicyPage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getPrivacyPolicyPageById,
  createPrivacyPolicyPage,
  updatePrivacyPolicyPageById,
  getPrivacyPolicyPageByIdGm,
};
