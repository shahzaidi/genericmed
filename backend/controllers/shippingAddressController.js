// controllers/shippingAddressController.js
const ShippingAddress = require("../models/shippingAddressModel");

const createShippingAddress = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      street,
      city,
      state,
      zipCode,
      country,
      email,
    } = req.body;

    const sessionId = req.sessionID;
    console.log(req.sessionID);
    let shippingAddress = await ShippingAddress.findOne({
      sessionId: req.sessionID,
    });

    if (!shippingAddress) {
      shippingAddress = new ShippingAddress({
        sessionId,
        firstName,
        lastName,
        phone,
        street,
        city,
        state,
        zipCode,
        country,
        email,
      });
    }
    const savedShippingAddress = await shippingAddress.save();

    res.status(201).json({
      message: "Shipping address created",
      shippingAddress: savedShippingAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createShippingAddress };
