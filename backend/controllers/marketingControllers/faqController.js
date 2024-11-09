// controllers/faqController.js

const Faq = require("../../models/marketingModels/faqModel");

// Get faq entry by id
const getFaqById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readFaqDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readFaqDg) {
      const faq = await Faq.findOne().sort({ createdAt: -1 });
      if (!faq) {
        return res.status(404).json({ success: true, faq: {} });
      }
      res.status(200).json({ success: true, faq });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getFaqByIdGm = async (req, res) => {
  try {
    const faq = await Faq.findOne().sort({ createdAt: -1 });
    if (!faq) {
      return res
        .status(404)
        .json({ success: false, message: "Faq entry not found" });
    }
    res.status(200).json({ success: true, faq });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create faq entry
const createFaq = async (req, res) => {
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].createFaqDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createFaqDg) {
      const faq = new Faq({
        metaTitle,
        metaDescription,
        metaKeyword,
        slug,
      });

      await faq.save();
      res
        .status(200)
        .json({ success: true, message: "FAQ page created successfully", faq });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update faq entry by id
const updateFaqById = async (req, res) => {
  const { id } = req.params;
  const { metaTitle, metaDescription, metaKeyword, slug } = req.body;

  try {
    if (!req.user.permissions[0].updateFaqDg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateFaqDg) {
      const faq = await Faq.findByIdAndUpdate(
        id,
        {
          metaTitle,
          metaDescription,
          metaKeyword,
          slug,
        },
        { new: true }
      );

      if (!faq) {
        return res
          .status(404)
          .json({ success: false, message: "Faq entry not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Faq page data updated successfully" });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getFaqById,
  createFaq,
  updateFaqById,
  getFaqByIdGm,
};
