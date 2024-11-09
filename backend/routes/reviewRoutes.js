const express = require("express");
const {
  protect,
  admin,
  sessionMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router();
const {
  createAndUpdateProductReviewForLoginUser,
  createProductReviewForGuestUser,
  getAllProductReviews,
  deleteReviewForLoginUser,
  reviewApprovedByAdminForGuestUser,
  getAllGuestUsersProductReviews,
  getAllGuestUsersPendingProductReviews,
  getAllGuestUsersApprovedProductReviews,
  deleteReviewByAdmin,
} = require("../controllers/reviewController");

router
  .route("/review/login")
  .put(protect, createAndUpdateProductReviewForLoginUser);
router
  .route("/review/guest")
  .put(sessionMiddleware, createProductReviewForGuestUser);
router.route("/all/reviews").get(getAllProductReviews);
router.route("/all/guest/users/reviews").get(getAllGuestUsersProductReviews);
router
  .route("/all/pending/guest/users/reviews")
  .get(getAllGuestUsersPendingProductReviews);
router
  .route("/all/approved/guest/users/reviews")
  .get(getAllGuestUsersApprovedProductReviews);
router
  .route("/delete/review/:productId")
  .delete(protect, deleteReviewForLoginUser);
router
  .route("/update/review/:reviewId")
  .put(protect, admin, reviewApprovedByAdminForGuestUser);

router
  .route("/delete/review/:productId/:reviewId")
  .delete(protect, admin, deleteReviewByAdmin);

module.exports = router;
