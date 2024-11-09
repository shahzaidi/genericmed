// routes/shopAllPageRoutes.js

const express = require("express");
const router = express.Router();
const {
  getShopAllPageById,
  createShopAllPage,
  updateShopAllPageById,
  getShopAllPageByIdGm,
} = require("../../controllers/pageContollers/shopAllPageController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get shopAllPage entry by id
router.route("/shopAllPage").get(protect, admin, getShopAllPageById);

router.route("/shopAllPage/gm").get(getShopAllPageByIdGm);

// Create shopAllPage entry
router.route("/shopAllPage").post(protect, admin, createShopAllPage);

// Update shopAllPage entry by id
router.route("/shopAllPage/:id").put(protect, admin, updateShopAllPageById);

module.exports = router;
