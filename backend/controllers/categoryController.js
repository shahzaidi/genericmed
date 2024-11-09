const Category = require("../models/categoryModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

// Create Category
// const createCategory = catchAsyncError(async (req, res, next) => {
//   let category = await Category.findOne({ name: req.body.name });

//   if (category) {
//     return next(new ErrorHandler("category already exist", 404));
//   }

//   if (req.user.permissions[0].create && req.user.permissions[0].categories) {
//     category = new Category(req.body);
//     await category.save();
//     res.status(201).json({
//       message: "Category created successfully.",
//       category,
//     });
//   } else {
//     res.status(401).json({ message: "Access Denied" });
//   }
// });

// Create category along with subcategories
const createCategory = catchAsyncError(async (req, res) => {
  const { name, image, status, subcategories } = req.body;

  try {
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }
    if (!req.user.permissions[0].createCategories) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createCategories) {
      // Create new category
      const newCategory = new Category({
        name,
        image,
        status,
        subcategories,
      });

      // Save the category to the database
      await newCategory.save();

      res.status(201).json({
        success: true,
        message: "Category created successfully",
        category: newCategory,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error?.message });
  }
});

// Create subcategory
const createSubCategory = catchAsyncError(async (req, res) => {
  const categoryId = req.query.id;

  // const category = await Category.findById(categoryId);
  const { name, imageUrl } = req.body;

  try {
    // Check if category exists
    if (!req.user.permissions[0].createCategories) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createCategories) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      // Check if subcategory already exists
      const existingSubcategory = category.subcategories.find(
        (sc) => sc.name === name
      );
      if (existingSubcategory) {
        return res
          .status(400)
          .json({ success: false, message: "Subcategory already exists" });
      }

      // Create new subcategory
      const newSubcategory = { name, imageUrl };
      category.subcategories.push(newSubcategory);

      // Save the updated category to the database
      await category.save();

      res.status(201).json({
        success: true,
        message: "Subcategory created successfully",
        subcategory: newSubcategory,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get All Categories
const getAllCategory = catchAsyncError(async (req, res, next) => {
  try {
    if (!req.user.permissions[0].readCategories) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readCategories) {
      let limit = Number(10);
      let currentPage = Number(req.query.page);
      let skip = Number(limit * (currentPage - 1));
      const categories = await Category.find({}).limit(limit).skip(skip);
      const categoriesCount = await Category.find({}).countDocuments();

      let categoryCount = await Category.countDocuments();

      res.status(200).json({
        success: true,
        categoryCount,
        categories,
        categoriesCount,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getAllCategoryGm = catchAsyncError(async (req, res, next) => {
  const categories = await Category.find({});

  let categoryCount = await Category.countDocuments();

  res.status(200).json({
    success: true,
    categoryCount,
    categories,
  });
});

// Get category by ID
const getCategoryById = catchAsyncError(async (req, res) => {
  try {
    if (!req.user.permissions[0].readCategories) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readCategories) {
      const categoryId = req.params.id;
      const category = await Category.findById(categoryId);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      res.status(200).json({ success: true, category });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const getCategoryByIdGm = catchAsyncError(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update category details
const updateCategory = catchAsyncError(async (req, res) => {
  try {
    const categoryId = req.query.id;
    const { name, image, status } = req.body;
    if (!req.user.permissions[0].updateCategories) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateCategories) {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { name, image, status },
        { new: true }
      );
      if (!updatedCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      res.json({
        success: true,
        message: "Category updated successfully",
        category: updatedCategory,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update subcategory
const updateSubCategory = catchAsyncError(async (req, res) => {
  const { categoryId, subcategoryId } = req.query;

  const { name, imageUrl } = req.body;

  try {
    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    if (!req.user.permissions[0].updateCategories) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateCategories) {
      // Find the subcategory by ID
      const subcategory = category.subcategories.id(subcategoryId);
      if (!subcategory) {
        return res
          .status(404)
          .json({ success: false, message: "Subcategory not found" });
      }

      // Check if the updated name already exists in other subcategories
      if (
        name !== subcategory.name &&
        category.subcategories.some((sc) => sc.name === name)
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Subcategory name already exists" });
      }

      // Update subcategory details
      subcategory.name = name;
      subcategory.imageUrl = imageUrl;

      // Save the updated category to the database
      await category.save();

      res.status(200).json({
        success: true,
        message: "Subcategory updated successfully",
        subcategory,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete a category
const deleteCategory = catchAsyncError(async (req, res) => {
  try {
    const categoryId = req.query.id;
    if (!req.user.permissions[0].deleteCategories) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].deleteCategories) {
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
      if (!deletedCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      res.json({
        success: true,
        message: "Category deleted successfully",
        category: deletedCategory,
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete subcategory
const deleteSubCategory = catchAsyncError(async (req, res) => {
  const { categoryId, subCategoryId } = req.query;

  try {
    // Check if category exists
    if (!req.user.permissions[0].deleteCategories) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].deleteCategories) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      // Find the index of the subcategory by ID
      const subcategoryIndex = category.subcategories.findIndex((sc) =>
        sc._id.equals(subCategoryId)
      );
      if (subcategoryIndex === -1) {
        return res
          .status(404)
          .json({ success: false, message: "Subcategory not found" });
      }

      // Remove the subcategory from the array
      category.subcategories.splice(subcategoryIndex, 1);

      // Save the updated category to the database
      await category.save();

      res
        .status(200)
        .json({ success: true, message: "Subcategory deleted successfully" });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = {
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
};
