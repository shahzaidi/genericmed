// routes/shopAllRoutes.js

const express = require("express");
const router = express.Router();
const {
  getShopAllById,
  createShopAll,
  updateShopAllById,
  getShopAllByIdGm,
} = require("../../controllers/marketingControllers/shopAllController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get shopAll entry by id
router.route("/shopAll").get(protect, admin, getShopAllById);

router.route("/shopAll/gm").get(getShopAllByIdGm);

// Create shopAll entry
router.route("/shopAll").post(createShopAll);

// Update shopAll entry by id
router.route("/shopAll/:id").put(protect, admin, updateShopAllById);

module.exports = router;
