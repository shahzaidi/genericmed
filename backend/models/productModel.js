const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
    },

    description: {
      type: String,
      required: [true, "product description is required"],
    },

    shortDescription: {
      type: String,
      required: [true, "product shortDescription is required"],
    },

    manufacturer: {
      type: String,
      required: [true, "product manufacturer is required"],
    },

    strength: {
      type: String,
      required: [true, "product strength is required"],
    },

    dosage: {
      type: String,
      required: [true, "product dosage is required"],
    },

    category: {
      type: String,
      required: [true, "product category is required"],
    },

    subCategory: {
      type: String,
      required: [false, "product category is required"],
    },

    image: {
      type: String,
      required: [true, "product image is required"],
    },

    images: {
      type: Array,
      required: [true, "images are required"],
    },

    ratings: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [8, "price cannot exceed 8 characters"],
    },

    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      maxLength: [6, "stock cannot exceed 6 characters"],
      default: 1,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    sku: {
      type: String,
      required: [true, "product sku is required"],
    },

    status: {
      type: String,
      required: true,
      default: "Active",
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    variantsAndPrices: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    numOfReviews: {
      type: Number,
      default: 0,
    },

    sellingCounter: {
      type: Number,
      default: 0,
    },

    metaKeyword: {
      type: String,
      required: [true, "Meta keyword is required"],
    },

    metaDescription: {
      type: String,
      required: [true, "Meta description is required"],
    },

    metaTitle: {
      type: String,
      required: [true, "Meta title is required"],
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
    },

    bestSeller: {
      type: Boolean,
      required: true,
      default: false,
    },

    bestOffer: {
      type: Boolean,
      required: true,
      default: false,
    },

    featuredProduct: {
      type: Boolean,
      required: true,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
