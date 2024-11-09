const ContactUs = require("../models/contactUsModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

// Create a new contact message
const createContactUs = asyncHandler(async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;
    if (!name || !email || !phoneNumber || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newContactUs = await ContactUs.create({
      name,
      email,
      phoneNumber,
      message,
    });

    res.status(201).json({ success: true, data: newContactUs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get all contact messages
const getAllContactUs = asyncHandler(async (req, res) => {
  try {
    if (!req.user.permissions[0].readContactUs) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readContactUs) {
      let limit = Number(10);
      let currentPage = Number(req.query.page);
      let skip = Number(limit * (currentPage - 1));
      const contactUsMessages = await ContactUs.find({})
        .limit(limit)
        .skip(skip);
      const contactUsCount = await ContactUs.find({}).countDocuments();
      res
        .status(200)
        .json({ success: true, contactUsMessages, contactUsCount });
    } else {
      res.status(401).json({ message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//Get contact message by ID
const getContactUsById = asyncHandler(async (req, res) => {
  try {
    const contactMessage = await ContactUs.findById(req.query.id);
    if (!contactMessage) {
      return res
        .status(404)
        .json({ success: false, message: "Contact message not found" });
    }
    res.json({ success: true, contactMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//Update a contact message
const updateContactUs = asyncHandler(async (req, res) => {
  try {
    const contactMessage = await ContactUs.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!contactMessage) {
      return res
        .status(404)
        .json({ success: false, message: "Contact message not found" });
    }

    res.json({ success: true, data: contactMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//Delete a contact message
const deleteContactUs = asyncHandler(async (req, res) => {
  try {
    if (!req.user.permissions[0].deleteContactUs) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].deleteContactUs) {
      const contactMessage = await ContactUs.findByIdAndDelete(req.query.id);

      if (!contactMessage) {
        return res
          .status(404)
          .json({ success: false, message: "ContactUs message not found" });
      }
      res.json({
        success: true,
        message: "ContactUs message deleted",
        contactUs: contactMessage,
      });
    } else {
      res.status(401).json({ message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = {
  createContactUs,
  getAllContactUs,
  getContactUsById,
  updateContactUs,
  deleteContactUs,
};
