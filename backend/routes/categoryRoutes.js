const express = require("express");
const {
  createCategory,
  createSubCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  updateSubCategory,
  deleteCategory,
  deleteSubCategory,
  getAllCategoryGm,
  getCategoryByIdGm,
} = require("../controllers/categoryController");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

// Create Category

router.route("/category/new").post(protect, admin, createCategory);
router.route("/subCategory/new").post(protect, admin, createSubCategory);

// Get All Category

router.route("/categories").get(protect, admin, getAllCategory);
router.route("/categories/gm").get(getAllCategoryGm);

// Get Category by Id Route
router.route("/categories/:id").get(protect, admin, getCategoryById);
router.route("/categories/:id/gm").get(getCategoryByIdGm);

// Update Category Route
router.route("/categories/update").put(protect, admin, updateCategory);
router.route("/subCategories/update").put(protect, admin, updateSubCategory);

// Delete Category Route
router.route("/categories/delete").delete(protect, admin, deleteCategory);
router.route("/subCategories/delete").delete(protect, admin, deleteSubCategory);

module.exports = router;
