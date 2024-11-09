const express = require("express");
const router = express.Router();
const {
  createOrder,
  createGuestUserOrder,
  createOrderByAdmin,
  getOrderById,
  getLatestOrder,
  getGuestLatestOrderById,
  updateOrderStatus,
  cancelOrder,
  getUserOrders,
  getAllOrders,
  getOrdersByStatus,
  getOrdersByDateRange,
  getAllKindOrdersCount,
  getPendingOrdersCount,
  getCompletedOrdersCount,
  getRecentOrders,
  getOrderByIdGm,
} = require("../controllers/orderController");
const {
  protect,
  admin,
  sessionMiddleware,
  sendUniqueId,
} = require("../middlewares/authMiddleware");

// User Routes
router.route("/order/create").post(protect, createOrder);
router.route("/Guest/order/create").post(sendUniqueId, createGuestUserOrder);
router.route("/admin/order/create").post(protect, admin, createOrderByAdmin);
router.route("/order/getUserOrder/:orderId").get(protect, getOrderById);
router.route("/order/getUserOrder/:orderId/gm").get(protect, getOrderByIdGm);
router
  .route("/order/getUserOrder/latest/:orderId")
  .get(protect, getLatestOrder);
router
  .route("/order/getGuestUserOrder/latest/:orderId")
  .get(sessionMiddleware, getGuestLatestOrderById);
router
  .route("/order/:orderId/update-status")
  .put(protect, admin, updateOrderStatus);
// router.route("/order/:orderId/cancel").delete(protect, cancelOrder);
router.route("/orders").get(protect, getUserOrders);

// Admin Routes
router.route("/admin/orders").get(protect, admin, getAllOrders);
router.route("/admin/orders/count/all/kind").get(getAllKindOrdersCount);
router.route("/admin/orders/count/pending").get(getPendingOrdersCount);
router.route("/admin/orders/count/completed").get(getCompletedOrdersCount);
router.route("/admin/orders/count/recent").get(getRecentOrders);
router.route("/admin/orders/status").get(protect, admin, getOrdersByStatus);
router
  .route("/admin/orders/range/date")
  .get(protect, admin, getOrdersByDateRange);

module.exports = router;
