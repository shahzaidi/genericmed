const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middlewares/authMiddleware");

// Add products to wishlist
router.route("/wishlist/add").post(protect, addToWishlist);

// Retrieve wishlist items
router.route("/wishlist").get(protect, getWishlistItems);

// Remove items from wishlist
router.route("/wishlist/remove/:id").delete(protect, removeFromWishlist);

module.exports = router;
