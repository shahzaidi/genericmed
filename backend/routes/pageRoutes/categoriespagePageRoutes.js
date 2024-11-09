// routes/categoriespagePageRoutes.js

const express = require("express");
const router = express.Router();
const {
  getCategoriesPagePageById,
  createCategoriesPagePage,
  updateCategoriesPagePageById,
  getCategoriesPagePageByIdGm,
} = require("../../controllers/pageContollers/categoriespagePageController");
const { protect, admin } = require("../../middlewares/authMiddleware");

// Get categoriesPagePage entry by id
router
  .route("/categoriesPagePage")
  .get(protect, admin, getCategoriesPagePageById);

router.route("/categoriesPagePage/gm").get(getCategoriesPagePageByIdGm);

// Create categoriesPagePage entry
router
  .route("/categoriesPagePage")
  .post(protect, admin, createCategoriesPagePage);

// Update categoriesPagePage entry by id
router
  .route("/categoriesPagePage/:id")
  .put(protect, admin, updateCategoriesPagePageById);

module.exports = router;
