// controllers/contactUsController.js

const ContactUs = require("../../models/marketingModels/contactUsModel");

// Get contactUs entry by id
const getContactUsById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readContactUsDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readContactUsDg) {
      const contactUs = await ContactUs.findOne().sort({ createdAt: -1 });
      if (!contactUs) {
        return res.status(404).json({ success: true, contactUs: {} });
      }
      res.status(200).json({ success: true, contactUs });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getContactUsByIdGm = async (req, res) => {
  try {
    const contactUs = await ContactUs.findOne().sort({ createdAt: -1 });
    if (!contactUs) {
      return res
        .status(404)
        .json({ success: false, message: "ContactUs entry not found" });
    }
    res.status(200).json({ success: true, contactUs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create contactUs entry
const createContactUs = async (req, res) => {
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].createContactUsDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createContactUsDg) {
      const contactUs = new ContactUs({
        metaTitle,
        metaDescription,
        metaKeyword,
        slug,
      });

      await contactUs.save();
      res.status(201).json({
        success: true,
        contactUs,
        message: "Contact created successfully",
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update contactUs entry by id
const updateContactUsById = async (req, res) => {
  const { id } = req.params;
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].updateContactUsDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateContactUsDg) {
      const contactUs = await ContactUs.findByIdAndUpdate(
        id,
        {
          metaTitle,
          metaDescription,
          metaKeyword,
          slug,
        },
        { new: true }
      );

      if (!contactUs) {
        return res
          .status(404)
          .json({ success: false, message: "ContactUs entry not found" });
      }

      res.status(200).json({
        success: true,
        message: "Contact us page data updated successfully",
        contactUs,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getContactUsById,
  createContactUs,
  updateContactUsById,
  getContactUsByIdGm,
};
