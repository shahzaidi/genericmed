const express = require("express");
const {
  createBlogCategory,
  createBlogSubCategory,
  getAllBlogCategory,
  getBlogCategoryById,
  updateBlogCategory,
  updateBlogSubCategory,
  deleteBlogCategory,
  deleteBlogSubCategory,
  getAllBlogCategoryGm,
  getBlogCategoryByIdGm,
} = require("../controllers/blogCategoryController");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

// Create Category

router.route("/blog/category/new").post(protect, admin, createBlogCategory);
router
  .route("/blog/subCategory/new")
  .post(protect, admin, createBlogSubCategory);

// Get All Category

router.route("/blog/categories").get(protect, admin, getAllBlogCategory);
router.route("/blog/categories/gm").get(getAllBlogCategoryGm);

// Get Category by Id Route
router.route("/blog/categories/:id").get(protect, admin, getBlogCategoryById);
router.route("/blog/categories/:id/gm").get(getBlogCategoryByIdGm);

// Update Category Route
router.route("/blog/categories/update").put(protect, admin, updateBlogCategory);
router
  .route("/subCategories/update")
  .put(protect, admin, updateBlogSubCategory);

// Delete Category Route
router
  .route("/blog/categories/delete")
  .delete(protect, admin, deleteBlogCategory);
router
  .route("/blog/subCategories/delete")
  .delete(protect, admin, deleteBlogSubCategory);

module.exports = router;
