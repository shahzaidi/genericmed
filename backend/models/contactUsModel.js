const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "contact name is required"],
  },

  email: {
    type: String,
    required: [true, "contact email is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "contact phoneNumber is required"],
  },
  message: {
    type: String,
    required: [true, "contact message is required"],
  },
  isReplied: {
    type: Boolean,
    default: false,
  },
});

const ContactUs = mongoose.model("contactUs", contactUsSchema);

module.exports = ContactUs;
