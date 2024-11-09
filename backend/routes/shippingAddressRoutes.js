// routes/shippingAddressRoutes.js
const express = require("express");
const router = express.Router();
const {
  createShippingAddress,
} = require("../controllers/shippingAddressController");

router.route("/guest/address/shipping/create").post(createShippingAddress);

module.exports = router;
