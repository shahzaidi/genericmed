// Assuming you have express set up
const express = require("express");
const validateSchema = require("../middlewares/validateSchema");
const {
  addItemToCart,
  addItemToGuestCart,
  getCart,
  getGuestCart,
  updateCartItem,
  removeItemFromCart,
  removeItemFromGuestCart,
  emptyCart,
  emptyGuestCart,
} = require("../controllers/cartController");
const {
  protect,
  sessionMiddleware,
  sendUniqueId,
} = require("../middlewares/authMiddleware"); // Auth middleware to protect routes

const router = express.Router();

// Adds an item to the cart or updates it if the item already exists
// router.route("/cart/add").post(protect, validateSchema, addItemToCart);
router.route("/cart/add").post(protect, addItemToCart);
router.route("/guest/cart/add").post(sendUniqueId, addItemToGuestCart);

// Retrieves the user's cart
router.route("/cart/get").get(protect, getCart);
router.route("/guest/cart/get").get(sendUniqueId, getGuestCart);

// Updates quantity of an item in the cart
// router.route("/cart/item/:itemId").put(protect, updateCartItem);

// Removes an item from the cart
router.route("/cart/item/:itemId").delete(protect, removeItemFromCart);
router.route("/guest/cart/item/:itemId").delete(removeItemFromGuestCart);

// Removes all items from the cart
router.route("/cart/empty").delete(protect, emptyCart);
router.route("/guest/cart/empty").delete(emptyGuestCart);

module.exports = router;
