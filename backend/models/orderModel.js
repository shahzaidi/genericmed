const mongoose = require("mongoose");

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
  },
  {
    timestamps: true,
  }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    sessionId: {
      type: String,
      required: false,
    },
    address: {
      firstName: {
        type: String,
        required: false,
      },
      lastName: {
        type: String,
        required: false,
      },
      phone: {
        type: Number,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      zipCode: {
        type: String,
        required: false,
      },
      street: {
        type: String,
        required: false,
      },
    },
    paymentGateway: {
      type: String,
      required: true,
    },

    orderNotes: {
      type: String,
      required: false,
    },

    finalAmount: {
      type: Number,
      required: true,
    },

    orderTotal: {
      type: Number,
      required: true,
    },
    discountAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "DELIVERED"],
      default: "PENDING",
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING",
    },
    createdBy: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    products: [cartItemSchema],
    // products: [
    //   {
    //     variant: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Product",
    //       required: true,
    //     },
    //     quantity: {
    //       type: Number,
    //       required: true,
    //     },
    //     price: {
    //       type: Number,
    //       required: true,
    //     },
    //     variantTotal: {
    //       type: Number,
    //       required: true,
    //       validate: {
    //         validator: Number.isInteger, // Validate if it's an integer
    //         message: "variant total must be an integer",
    //       },
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

// For future reference
// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   items: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
//   total: {
//     type: Number,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["pending", "processing", "shipped", "delivered"],
//     default: "pending",
//   },
//   shippingAddress: {
//     street: String,
//     city: String,
//     state: String,
//     zip: String,
//     country: String,
//   },
//   billingAddress: {
//     street: String,
//     city: String,
//     state: String,
//     zip: String,
//     country: String,
//   },
//   paymentMethod: {
//     type: String,
//     enum: ["credit_card", "paypal", "stripe"],
//     required: true,
//   },
//   paymentStatus: {
//     type: String,
//     enum: ["pending", "completed", "failed"],
//     default: "pending",
//   },
//   paymentDate: {
//     type: Date,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Order", orderSchema);
