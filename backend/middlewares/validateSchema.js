const Cart = require("../models/cartModel");
const mongoose = require("mongoose");

// const validateSchema = async (req, res, next) => {
//   try {
//     // Validate the request body against the schema
//     const cart = new Cart(req.body);
//     await cart.validate();
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ message: error.message });
//   }
// };

// const Joi = require("joi");

// const cartItemSchema = Joi.object({
//   productId: Joi.string().required(),
//   quantity: Joi.number().integer().min(1).required(),
//   price: Joi.number().required(),
// });

// const cartSchema = Joi.object({
//   items: Joi.array().items(cartItemSchema),
// });

// const validateSchema = (req, res, next) => {
//   const { error } = cartSchema.validate(req.body, { allowUnknown: true }); // Allow unknown fields (like user)
//   if (error) {
//     return res.status(400).json({ message: error.details[0].message });
//   }
//   next();
// };

const validateSchema = async (req, res, next) => {
  try {
    // Validate if productId is a valid ObjectId
    if (
      !req.body.productId ||
      !mongoose.Types.ObjectId.isValid(req.body.productId)
    ) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    // Validate if user exists and is a valid ObjectId
    if (!req.user || !mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ message: "Invalid user" });
    }

    // Validate if quantity is a positive integer
    if (
      !req.body.quantity ||
      !Number.isInteger(req.body.quantity) ||
      req.body.quantity <= 0
    ) {
      return res
        .status(400)
        .json({ message: "Quantity must be a positive integer" });
    }
    // Validate if price is a valid floating-point number
    const price = parseFloat(req.body.price);

    // Validate if price is a valid number
    if (!req.body.price || isNaN(price)) {
      return res.status(400).json({ message: "Price must be a valid number" });
    }

    // Check if user exists
    // const userExists = await User.exists({ _id: req.user.id });
    // if (!userExists) {
    //   return res.status(400).json({ message: "User does not exist" });
    // }

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = validateSchema;
