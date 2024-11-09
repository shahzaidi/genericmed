// cart schema
const { string } = require("joi");
const mongoose = require("mongoose");

// const variantSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//     validate: {
//       validator: (price) => !isNaN(price), // Validate if it's a number
//       message: "Price must be a number",
//     },
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     validate: {
//       validator: Number.isInteger, // Validate if it's an integer
//       message: "Quantity must be an integer",
//     },
//   },
// });

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (price) => !isNaN(price), // Validate if it's a number
      message: "Price must be a number",
    },
  },
  quantity: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger, // Validate if it's an integer
      message: "Quantity must be an integer",
    },
  },
  variantTotal: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger, // Validate if it's an integer
      message: "variant total must be an integer",
    },
  },
});

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
    },
    variants: [variantSchema],
    image: { type: String },
  },
  {
    timestamps: true,
  }
);
const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    sessionId: {
      type: String,
      required: false,
      unique: true,
    },
    items: [cartItemSchema],
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
