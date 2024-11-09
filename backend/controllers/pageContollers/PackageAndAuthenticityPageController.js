// controllers/packageAndAuthenticityPageController.js
const PackageAndAuthenticityPage = require("../../models/pageModels/packageAndAuthenticityPageModel");

// Get packageAndAuthenticityPage entry by id
const getPackageAndAuthenticityPageById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readPackageAndAuthenticityPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readPackageAndAuthenticityPg) {
      const packageAndAuthenticityPage =
        await PackageAndAuthenticityPage.findOne().sort({ createdAt: -1 });
      if (!packageAndAuthenticityPage) {
        return res.status(404).json({
          success: true,
          packageAndAuthenticityPage: {},
        });
      }
      res.status(200).json({ success: true, packageAndAuthenticityPage });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPackageAndAuthenticityPageByIdGm = async (req, res) => {
  try {
    const packageAndAuthenticityPage =
      await PackageAndAuthenticityPage.findOne().sort({ createdAt: -1 });
    if (!packageAndAuthenticityPage) {
      return res.status(404).json({
        success: false,
        message: "PackageAndAuthenticityPage entry not found",
      });
    }
    res.status(200).json({ success: true, packageAndAuthenticityPage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create packageAndAuthenticityPage entry
const createPackageAndAuthenticityPage = async (req, res) => {
  const { termsAndConditions } = req.body;

  try {
    if (!req.user.permissions[0].createPackageAndAuthenticityPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createPackageAndAuthenticityPg) {
      const packageAndAuthenticityPage = new PackageAndAuthenticityPage({
        termsAndConditions,
      });

      await packageAndAuthenticityPage.save();
      res.status(200).json({
        success: true,
        message: "Package and authenticity Page data created successfully",
        packageAndAuthenticityPage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update packageAndAuthenticityPage entry by id
const updatePackageAndAuthenticityPageById = async (req, res) => {
  const { id } = req.params;
  const { termsAndConditions } = req.body;

  try {
    if (!req.user.permissions[0].updatePackageAndAuthenticityPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updatePackageAndAuthenticityPg) {
      const packageAndAuthenticityPage =
        await PackageAndAuthenticityPage.findByIdAndUpdate(
          id,
          {
            termsAndConditions,
          },
          { new: true }
        );

      if (!packageAndAuthenticityPage) {
        return res.status(404).json({
          success: false,
          message: "PackageAndAuthenticityPage entry not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Package and authenticity Page data updated successfully",
        packageAndAuthenticityPage,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getPackageAndAuthenticityPageById,
  createPackageAndAuthenticityPage,
  updatePackageAndAuthenticityPageById,
  getPackageAndAuthenticityPageByIdGm,
};
