const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  getAllBestSellerProducts,
  getAllBestOffersProducts,
  createProductReview,
  getProductReviews,
  getAllFeaturedProducts,
  deleteProductReview,
  getAllProductsGm,
  getProductDetailsGm,
} = require("../controllers/productController");
const Product = require("../models/productModel");
const { protect, admin } = require("../middlewares/authMiddleware");

const {
  createAndUpdateProductReviewForLoginUser,
  getAllProductReviews,
} = require("../controllers/reviewController");

const router = express.Router();

// Create Product

router.route("/product/new").post(protect, admin, createProduct);

// Get All Products

router.route("/products").get(protect, admin, getAllProducts);
router.route("/products/gm").get(getAllProductsGm);

// Get Best Seller products
router.route("/products/bestSellers").get(getAllBestSellerProducts);

// Get Best Offers products
router.route("/products/bestOffers").get(getAllBestOffersProducts);

// Get Featured products
router.route("/products/featuredProducts").get(getAllFeaturedProducts);

// Get Single Product Details and Product Delete

router.route("/product/:id").get(protect, admin, getProductDetails);
router.route("/product/gm/:id").get(getProductDetailsGm);
router.route("/product/:id").delete(protect, admin, deleteProduct);

// Update Product

router.route("/product/:id").put(protect, admin, updateProduct);

// create and updateReview

router
  .route("/review/login")
  .put(protect, createAndUpdateProductReviewForLoginUser);

// Get Product Reviews

router.route("/reviews").get(getAllProductReviews);

// Delete Product Review

router.route("/review/delete").delete(protect, deleteProductReview);
router.route("/product/:id").put(updateProduct);

module.exports = router;
