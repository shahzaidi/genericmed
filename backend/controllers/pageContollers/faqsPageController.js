// controllers/faqsPageController.js
const FaqsPage = require("../../models/pageModels/faqsPageModel");

// Get faqsPage entry by id
const getFaqsPageById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.user.permissions[0].readFaqsPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readFaqsPg) {
      const faqsPage = await FaqsPage.findById(id);
      if (!faqsPage) {
        return res.status(404).json({ success: true, faqsPage: {} });
      }
      res.status(200).json({ success: true, faqsPage });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getFaqsPageByIdGm = async (req, res) => {
  const { id } = req.params;

  try {
    const faqsPage = await FaqsPage.findById(id);
    if (!faqsPage) {
      return res.status(404).json({ message: "FaqsPage entry not found" });
    }
    res.status(200).json({ success: true, faqsPage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All faqsPage
const getAllFaqsPages = async (req, res) => {
  try {
    if (!req.user.permissions[0].readFaqsPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readFaqsPg) {
      const faqsPages = await FaqsPage.find({});
      if (!faqsPages) {
        return res.status(404).json({ message: "FaqsPages entry not found" });
      }
      res.json(faqsPages);
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllFaqsPagesGm = async (req, res) => {
  try {
    const faqsPages = await FaqsPage.find({});
    if (!faqsPages) {
      return res.status(404).json({ message: "FaqsPages entry not found" });
    }
    res.json(faqsPages);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create faqsPage entry
const createFaqsPage = async (req, res) => {
  const { category, question, answer, status } = req.body;

  try {
    if (!req.user.permissions[0].createFaqsPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createFaqsPg) {
      const faqsPage = new FaqsPage({
        category,
        question,
        answer,
        status,
      });

      await faqsPage.save();
      res
        .status(201)
        .json({ success: true, message: "Faq created successfully", faqsPage });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update faqsPage entry by id
const updateFaqsPageById = async (req, res) => {
  const { id } = req.params;
  const { category, question, answer, status } = req.body;

  try {
    if (!req.user.permissions[0].updateFaqsPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateFaqsPg) {
      const faqsPage = await FaqsPage.findByIdAndUpdate(
        id,
        {
          category,
          question,
          answer,
          status,
        },
        { new: true }
      );

      if (!faqsPage) {
        return res
          .status(404)
          .json({ success: false, message: "FaqsPage entry not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Faq updated successfully", faqsPage });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getAllFaqs = async (req, res) => {
  try {
    if (!req.user.permissions[0].readFaqsPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readFaqsPg) {
      const faqs = await FaqsPage.find({}); // Fetch all users
      res.status(200).json({ success: true, faqs });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete faq entry by id
const deleteFaqById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.user.permissions[0].deleteFaqsPg) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].deleteFaqsPg) {
      const faq = await FaqsPage.findByIdAndDelete(id);

      if (!faq) {
        return res
          .status(404)
          .json({ success: false, message: "Faq Page entry not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Faq deleted successfully" });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  getFaqsPageById,
  getAllFaqsPages,
  createFaqsPage,
  updateFaqsPageById,
  getAllFaqs,
  deleteFaqById,
  getFaqsPageByIdGm,
  getAllFaqsPagesGm,
};
