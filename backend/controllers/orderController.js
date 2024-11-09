const { response } = require("express");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

// const createOrder = async (req, res) => {
//   try {
//     const { products } = req.body;
//     const user = req.user.id;
//     let orderTotal = 0;
//     for (const variant of products) {
//       orderTotal += variant.price * variant.quantity;
//     }
//     const order = new Order({ user, products, orderTotal });

//     await order.save();
//     res.status(201).json({ message: "Order created successfully", order });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const createOrder = async (req, res) => {
  try {
    const user = req.user.id;
    const {
      address,
      orderTotal,
      paymentGateway,
      orderNotes,
      products,
      finalAmount,
      discountAmount,
    } = req.body;

    address.email = req?.user?.email;

    const order = new Order({
      user,
      address,
      orderTotal,
      paymentGateway,
      orderNotes,
      products,
      finalAmount,
      discountAmount,
    });

    await order.save();
    res
      .status(201)
      .json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const createGuestUserOrder = async (req, res) => {
  try {
    const sessionId = req.cookies.sessionId;
    console.log(sessionId);
    if (req.cookies.sessionId) {
      const {
        address,
        orderTotal,
        paymentGateway,
        orderNotes,
        products,
        finalAmount,
        discountAmount,
      } = req.body;

      // let orderTotal = 0;

      // // Calculate order total based on products and variants
      // for (const product of products) {
      //   for (const variant of product.variants) {
      //     orderTotal += variant.price * variant.quantity;
      //   }
      // }

      const order = new Order({
        sessionId,
        address,
        orderTotal,
        paymentGateway,
        orderNotes,
        products,
        finalAmount,
        discountAmount,
      });

      await order.save();
      res
        .status(201)
        .json({ success: true, message: "Order created successfully", order });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const createOrderByAdmin = async (req, res) => {
  try {
    if (!req.user.permissions[0].createOrders) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createOrders) {
      const {
        fullName,
        phoneNumber,
        email,
        country,
        city,
        zip,
        state,
        paymentGateway,
        address,
        orderNotes,
        products,
      } = req.body;
      const user = req.user.id;
      if (
        !fullName ||
        !phoneNumber ||
        !email ||
        !country ||
        !city ||
        !zip ||
        !state ||
        !paymentGateway ||
        !address ||
        !orderNotes ||
        !products
      ) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }
      let orderTotal = 0;
      let createdBy = "ADMIN";
      for (const variant of products) {
        orderTotal += variant.price * variant.quantity;
      }
      const order = new Order({ user, products, orderTotal, createdBy });
      await order.save();
      res.status(201).json({ message: "Order created successfully", order });
    } else {
      res.status(401).json({ message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOrderById = asyncHandler(async (req, res) => {
  try {
    if (!req.user.permissions[0].readOrders) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readOrders) {
      const { orderId } = req.params;
      const order = await Order.findById({ _id: orderId });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ success: true, message: " Success", order });
    } else {
      res.status(401).json({ message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getOrderByIdGm = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ success: true, message: " Success", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET latest order for a user
const getLatestOrder = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById({ _id: orderId });
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

const getGuestLatestOrderById = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById({ _id: orderId });

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const orderId = req.params.orderId;
    let { status, paymentStatus } = req.body;
    status = status.toUpperCase();
    paymentStatus = paymentStatus.toUpperCase();
    if (!req.user.permissions[0].updateOrders) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateOrders) {
      const order = await Order.findByIdAndUpdate(
        orderId,
        { status, paymentStatus },
        { new: true }
      );
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        order,
      });
    } else {
      res.status(401).json({ message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const cancelOrder = asyncHandler(async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is attached to the request object
    const userOrders = await Order.find({ user: userId });
    res.json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    // let status = req.query.status ? req.query.status : {};
    // console.log(`hitting from frontend`);
    ////////

    /////////
    if (!req.user.permissions[0].readOrders) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readOrders) {
      let limit = Number(10);
      let currentPage = Number(req.query.page);
      let skip = Number(limit * (currentPage - 1));

      const allOrdersCount = req.query.status
        ? await Order.find({ status: req.query.status }).countDocuments()
        : await Order.find({}).countDocuments();
      const orders = req.query.status
        ? await Order.find({ status: req.query.status }).limit(limit).skip(skip)
        : await Order.find().limit(limit).skip(skip);
      res.status(200).json({ success: true, orders, allOrdersCount });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getOrdersByStatus = asyncHandler(async (req, res) => {
  try {
    let { status } = req.query;
    // Convert status to case-insensitive regex pattern
    status = new RegExp(status, "i");

    const ordersByStatus = await Order.find({ status });
    res.json(ordersByStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getOrdersByDateRange = asyncHandler(async (req, res) => {
  try {
    const { start, end } = req.query;
    const ordersByDateRange = await Order.find({
      createdAt: { $gte: new Date(start), $lte: new Date(end) },
    });
    res.json(ordersByDateRange);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all orders count
const getAllKindOrdersCount = async (req, res) => {
  try {
    const allOrdersCount = await Order.countDocuments();
    const allPendingOrdersCount = await Order.countDocuments({
      status: "PENDING",
    });
    const allCompletedOrdersCount = await Order.countDocuments({
      status: "COMPLETED",
    });
    let limit = Number(10);
    let currentPage = Number(req.query.page);
    let skip = Number(limit * (currentPage - 1));
    const last24Hours = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const allRecentOrders = await Order.find({
      createdAt: { $gte: last24Hours },
    })
      .limit(limit)
      .skip(skip);
    const allRecentOrdersCount = await Order.countDocuments({
      createdAt: { $gte: last24Hours },
    });
    res.status(200).json({
      success: true,
      allOrdersCount,
      allPendingOrdersCount,
      allCompletedOrdersCount,
      allRecentOrders,
      allRecentOrdersCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get pending orders count
const getPendingOrdersCount = async (req, res) => {
  try {
    const count = await Order.countDocuments({ status: "PENDING" });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get completed orders count
const getCompletedOrdersCount = async (req, res) => {
  try {
    const count = await Order.countDocuments({ status: "COMPLETED" });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recent orders (last 24 hours)
const getRecentOrders = async (req, res) => {
  try {
    const last24Hours = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const orders = await Order.find({ createdAt: { $gte: last24Hours } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
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
};
