const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const Review = require("../models/reviewModel");
const { trusted } = require("mongoose");

const createAndUpdateProductReviewForLoginUser = catchAsyncError(
  async (req, res, next) => {
    let newReview;
    const { rating, comment, productId } = req.body;

    console.log(req.body);
    if (!rating || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Rating and Comment" });
    }
    const review = {
      product: productId,
      user: req.user.id,
      name: `${req.user.firstName}  ${req.user.lastName}`,
      rating: Number(rating),
      comment,
      isApproved: true,
    };

    // console.log(review);
    const isReviewed = await Review.findOne({
      user: req.user.id,
      product: productId,
    });

    if (isReviewed) {
      (isReviewed.rating = Number(rating)),
        (isReviewed.comment = comment),
        await isReviewed.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        message: "Review added Successfully",
        isReviewed,
      });
    } else {
      newReview = new Review(review);

      await newReview.save();

      //////////////////
    }

    let avg = 0;

    const productReviews = await Review.find({
      product: productId,
      isApproved: true,
    });
    const product = await Product.findOne({ _id: productId });

    productReviews.forEach((rev) => {
      avg += rev.rating;
    });
    console.log(
      avg,
      productReviews.length,
      avg / productReviews.length,
      "avg / productReviews.length"
    );
    product.ratings = Math.round(avg / productReviews.length);
    product.numOfReviews = productReviews.length;

    await product.save({ validateBeforeSave: false });

    res
      .status(200)
      .json({ success: true, message: "Review added successfully" });
  }
);

// For Guest User

const createProductReviewForGuestUser = catchAsyncError(
  async (req, res, next) => {
    let newReview;
    const { rating, comment, productId, name } = req.body;
    const sessionId = req.sessionId;

    // console.log(req.body);
    if (!rating || !comment || !name) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Name, Rating and Comment",
      });
    }
    const review = {
      product: productId,
      name: name,
      rating: Number(rating),
      comment,
      sessionId,
    };

    newReview = new Review(review);

    await newReview.save();

    //////////////////

    let avg = 0;

    const productReviews = await Review.find({
      product: productId,
      isApproved: true,
    });
    const product = await Product.findOne({ _id: productId });

    productReviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = Math.round(avg / productReviews.length);
    product.numOfReviews = productReviews.length;

    await product.save({ validateBeforeSave: false });

    res
      .status(200)
      .json({ success: true, message: "Review added successfully" });
  }
);

const getAllProductReviews = catchAsyncError(async (req, res, next) => {
  const reviews = await Review.find({
    product: req.query.productId,

    isApproved: true,
  });

  //   console.log(reviews, "ghgadfga");
  if (!reviews) {
    return next(new ErrorHandler("Product reviews not found", 404));
  }
  // console.log(reviews, "ghgadfga............///");
  res.status(200).json({ success: true, reviews });
});

// Delete Review  For Login User

const deleteReviewForLoginUser = catchAsyncError(async (req, res, next) => {
  const { productId } = req.params;
  const review = await Review.findOneAndDelete({
    user: req.user.id,
    product: productId,
  });

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  let avg = 0;

  const productReviews = await Review.find({
    product: productId,
    isApproved: true,
  });
  const product = await Product.findOne({ _id: productId });

  productReviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = Math.round(avg / productReviews.length);
  product.numOfReviews = productReviews.length;

  await product.save({ validateBeforeSave: false });

  res
    .status(200)
    .json({ success: true, message: "Review deleted successfully" });
});

// Review approved by Admin for guest User

const reviewApprovedByAdminForGuestUser = catchAsyncError(
  async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findByIdAndUpdate(
      reviewId,
      {
        isApproved: true,
      },
      { new: true }
    );

    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    let avg = 0;

    const productReviews = await Review.find({
      product: review.product,
      isApproved: true,
    });
    const product = await Product.findOne({ _id: review.product });

    productReviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = Math.round(avg / productReviews.length);
    product.numOfReviews = productReviews.length;

    await product.save({ validateBeforeSave: false });

    res
      .status(200)
      .json({ success: true, message: "Review approved successfully" });
  }
);

const getAllGuestUsersProductReviews = catchAsyncError(
  async (req, res, next) => {
    let limit = Number(10);
    let currentPage = Number(req.query.page);
    let skip = Number(limit * (currentPage - 1));
    const reviews = await Review.find({
      sessionId: { $exists: true, $ne: null },
    })
      .limit(limit)
      .skip(skip)
      .populate("product", "image");

    const allReviewsCount = await Review.find({
      sessionId: { $exists: true, $ne: null },
    }).countDocuments();

    if (!reviews || reviews.length === 0) {
      return next(new ErrorHandler("No Reviews found!", 404));
    }
    // console.log(reviews, "ghgadfga............///");
    res.status(200).json({ success: true, reviews, allReviewsCount });
  }
);

const getAllGuestUsersPendingProductReviews = catchAsyncError(
  async (req, res, next) => {
    let limit = Number(10);
    let currentPage = Number(req.query.page);
    let skip = Number(limit * (currentPage - 1));
    const reviews = await Review.find({
      sessionId: { $exists: true, $ne: null },
      isApproved: false,
    })
      .limit(limit)
      .skip(skip)
      .populate("product", "image");

    const pendingReviewsCount = await Review.find({
      sessionId: { $exists: true, $ne: null },
      isApproved: false,
    }).countDocuments();

    if (!reviews || reviews.length === 0) {
      return next(new ErrorHandler("No Reviews found!", 404));
    }
    // console.log(reviews, "ghgadfga............///");
    res.status(200).json({ success: true, reviews, pendingReviewsCount });
  }
);

const getAllGuestUsersApprovedProductReviews = catchAsyncError(
  async (req, res, next) => {
    let limit = Number(10);
    let currentPage = Number(req.query.page);
    let skip = Number(limit * (currentPage - 1));
    const reviews = await Review.find({
      sessionId: { $exists: true, $ne: null },
      isApproved: true,
    })
      .limit(limit)
      .skip(skip)
      .populate("product", "image");

    const approvedReviewsCount = await Review.find({
      sessionId: { $exists: true, $ne: null },
      isApproved: true,
    }).countDocuments();

    if (!reviews || reviews.length === 0) {
      return next(new ErrorHandler("No Reviews found!", 404));
    }
    // console.log(reviews, "ghgadfga............///");
    res.status(200).json({ success: true, reviews, approvedReviewsCount });
  }
);

// Delete Review  For Login User

const deleteReviewByAdmin = catchAsyncError(async (req, res, next) => {
  const { productId, reviewId } = req.params;
  const review = await Review.findOneAndDelete({
    _id: reviewId,
    product: productId,
  });

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  let avg = 0;

  const productReviews = await Review.find({
    product: productId,
    isApproved: true,
  });
  const product = await Product.findOne({ _id: productId });

  productReviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = Math.round(avg / productReviews.length);
  product.numOfReviews = productReviews.length;

  await product.save({ validateBeforeSave: false });

  res
    .status(200)
    .json({ success: true, message: "Review deleted successfully" });
});

module.exports = {
  createAndUpdateProductReviewForLoginUser,
  createProductReviewForGuestUser,
  getAllProductReviews,
  deleteReviewForLoginUser,
  reviewApprovedByAdminForGuestUser,
  getAllGuestUsersProductReviews,
  getAllGuestUsersPendingProductReviews,
  getAllGuestUsersApprovedProductReviews,
  deleteReviewByAdmin,
};
