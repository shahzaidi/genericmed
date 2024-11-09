const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

// Create Product

const createProduct = catchAsyncError(async (req, res, next) => {
  let product = new Product(req.body);
  if (!req.user.permissions[0].createProducts) {
    return res.status(400).json({
      success: false,
      message: "Access Denied",
    });
  }
  if (req.user.permissions[0].createProducts) {
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product created Successfully",
      product,
    });
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
});

// Get All Products

const getAllProducts = catchAsyncError(async (req, res, next) => {
  if (!req.user.permissions[0].readProducts) {
    return res.status(400).json({
      success: false,
      message: "Access Denied",
    });
  }
  if (req.user.permissions[0].readProducts) {
    let productCountWithApiFeatures;
    // console.log(req.query, "from query");
    // console.log(
    //   Object.keys(req.query).length,
    //   "from query..........................////"
    // );
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(12);

    // Base query to exclude soft-deleted products
    const baseQuery = Product.find({ isDeleted: false });

    const apiFeatures2 = new ApiFeatures(baseQuery, req.query)
      .search()
      .filter();

    const products = await apiFeatures.query;

    productCountWithApiFeatures = await Product.countDocuments(
      apiFeatures2.query.getQuery()
    );

    let productCount = await Product.countDocuments({ isDeleted: false });

    res.status(200).json({
      success: true,
      productCount,
      productCountWithApiFeatures,
      products,
    });
  } else {
    res.status(401).json({ success: false, message: "Access Denied" });
  }
});

const getAllProductsGm = catchAsyncError(async (req, res, next) => {
  let productCountWithApiFeatures;

  // console.log(req.query, "from query");
  // console.log(
  //   Object.keys(req.query).length,
  //   "from query..........................////"
  // );

  // Base query to exclude soft-deleted products
  const baseQuery = Product.find({ isDeleted: false });

  const apiFeatures = new ApiFeatures(baseQuery, req.query)
    .search()
    .filter()
    .pagination(12);

  const apiFeatures2 = new ApiFeatures(baseQuery, req.query).search().filter();

  const products = await apiFeatures.query;

  productCountWithApiFeatures = await Product.countDocuments(
    apiFeatures2.query.getQuery()
  );

  let productCount = await Product.countDocuments({ isDeleted: false });

  res.status(200).json({
    success: true,
    productCount,
    productCountWithApiFeatures,
    products,
  });
});

// Best Sellers

const getAllBestSellerProducts = catchAsyncError(async (req, res) => {
  try {
    let page = req.query.page ? Number(req.query.page) : 1;
    let resultPerPage = 8;

    let count = await Product.find({ bestSeller: true })
      .sort({ createdAt: -1 })
      .countDocuments();
    let skip = resultPerPage * (page - 1);
    const bestSellersProducts = await Product.find({ bestSeller: true })
      .sort({ createdAt: -1 })
      .limit(resultPerPage)
      .skip(skip);
    res.status(200).json({ success: true, count, bestSellersProducts });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }

  // const bestSellersProducts = await Product.find()
  //   .sort({
  //     sellingCounter: -1,
  //   })
  //   .limit(6);

  // let productCount = await Product.countDocuments();// Adjust the limit as needed
  // res.status(200).json({ success: true, bestSellersProducts });
});

// Best Offers

const getAllBestOffersProducts = catchAsyncError(async (req, res) => {
  try {
    let page = req.query.page ? Number(req.query.page) : 1;
    let resultPerPage = 8;

    let count = await Product.find({ bestOffer: true })
      .sort({ createdAt: -1 })
      .countDocuments();
    let skip = resultPerPage * (page - 1);
    const bestOffersProducts = await Product.find({ bestOffer: true })
      .sort({ createdAt: -1 })
      .limit(resultPerPage)
      .skip(skip);
    res.status(200).json({ success: true, count, bestOffersProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }

  // const bestOffersProducts = await Product.find()
  //   .sort({
  //     discount: -1,
  //   })
  //   .limit(6);

  // res.status(200).json({ success: true, bestOffersProducts });
});

// Featured Products

const getAllFeaturedProducts = catchAsyncError(async (req, res) => {
  try {
    let page = req.query.page ? Number(req.query.page) : 1;
    let resultPerPage = 8;

    let count = await Product.find({ featuredProduct: true })
      .sort({ createdAt: -1 })
      .countDocuments();
    let skip = resultPerPage * (page - 1);
    const featuredProducts = await Product.find({
      featuredProduct: true,
    })
      .sort({ createdAt: -1 })
      .limit(resultPerPage)
      .skip(skip);
    res.status(200).json({ success: true, count, featuredProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Single Product Details

const getProductDetails = catchAsyncError(async (req, res, next) => {
  // try {
  if (!req.user.permissions[0].readProducts) {
    return res.status(400).json({
      success: false,
      message: "Access Denied",
    });
  }
  if (req.user.permissions[0].readProducts) {
    let productId = req.params.id;

    let product = await Product.findById({ _id: productId });

    if (!product) {
      // res.status(404).json({ success: false, message: "no record found" });
      return next(new ErrorHandler("no record found", 404));
    }

    res.status(200).json({ success: true, product });
  } else {
    res.status(401).json({ success: false, message: "Access Denied" });
  }
});

const getProductDetailsGm = catchAsyncError(async (req, res, next) => {
  // try {

  let productId = req.params.id;

  let product = await Product.findById({ _id: productId });

  if (!product) {
    // res.status(404).json({ success: false, message: "no record found" });
    return next(new ErrorHandler("no record found", 404));
  }

  res.status(200).json({ success: true, product });
});

// Update Product By Id

const updateProduct = catchAsyncError(async (req, res, next) => {
  let productId = req.params.id;
  if (!req.user.permissions[0].updateProducts) {
    return res.status(400).json({
      success: false,
      message: "Access Denied",
    });
  }
  if (req.user.permissions[0].updateProducts) {
    let product = await Product.findByIdAndUpdate(
      { _id: productId },
      req.body,
      {
        new: true,
      }
    );

    if (!product) {
      res.status(200).json({ success: false, message: "no record found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated Successfully",
      product,
    });
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
});

// Delete Product By Id .

const deleteProduct = catchAsyncError(async (req, res, next) => {
  let productId = req.params.id;
  if (!req.user.permissions[0].deleteProducts) {
    return res.status(400).json({
      success: false,
      message: "Access Denied",
    });
  }
  if (req.user.permissions[0].deleteProducts) {
    let product = await Product.findByIdAndUpdate(
      productId,
      {
        isDeleted: true,
      },
      { new: true }
    );

    if (!product) {
      return res
        .status(200)
        .json({ success: false, message: "No record found" });
    }

    // product.isDeleted = true;

    // await product.save();
    res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully" });
  } else {
    res.status(401).json({ success: false, message: "Access Denied" });
  }
});

// Create New Review or Update the Review

const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  if (!rating || !comment) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Rating and Comment" });
  }
  const review = {
    user: req.user.id,
    name: `${req.user.firstName}  ${req.user.lastName}`,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if ((rev) => rev.user.toString() === req.user.id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, message: "Review added successfully" });
});

// Get All Reviews of a Product

const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, reviews: product.reviews });
});

// Delete Review

const deleteProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let findReview = product.reviews.find(
    (rev) => rev._id.toString() === req.query.id.toString()
  );

  if (!findReview) {
    return res
      .status(401)
      .json({ success: false, message: "Review not available with this Id" });
  }

  let reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  // console.log(reviews, "reviews");

  let avg = 0;

  reviews.forEach((rev) => {
    rev.rating ? (avg += rev.rating) : 0;
  });

  // console.log(avg, "avg");
  // console.log(avg /reviews.length, "reviews2");

  let ratings = Number(avg !== 0 ? avg / reviews.length : 0);
  //       console.log(ratings, "ratings");

  let numOfReviews = Number(reviews.length);

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res
    .status(200)
    .json({ success: true, message: "Review deleted successfully" });
});

module.exports = {
  getAllProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  getAllBestSellerProducts,
  getAllBestOffersProducts,
  createProductReview,
  getProductReviews,
  deleteProductReview,
  getAllFeaturedProducts,
  getAllProductsGm,
  getProductDetailsGm,
};
