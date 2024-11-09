const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Discount = require("../models/couponCodeModel");

const calculateOrderTotal = async (req, res) => {
  try {
    const { products } = req.body;
    let orderTotal = 0;
    for (const variant of products) {
      orderTotal += variant.price * variant.quantity;
    }
    res.json({ orderTotal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const applyDiscount = async (req, res) => {
  try {
    const { cartId, orderId, discountCode } = req.body;

    // Find the order by orderId from the database
    // const order = await Order.findById(orderId);
    // if (!order) {
    //   return res.status(404).json({ message: "Order not found" });
    // }

    // Find the cart by cartId from the database
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the discount by discountCode from the database
    const discount = await Discount.findOne({ code: discountCode });
    if (!discount) {
      return res.status(404).json({ message: "Discount code not found" });
    }

    // Apply discount logic here (e.g., update cart total)
    cart.total -= (cart.total * discount.percentage) / 100;

    // Save the updated order
    await cart.save();

    res.json({ message: "Discount applied successfully", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const processPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;

    // Find the order by orderId from the database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Placeholder payment processing logic (e.g., integration with payment gateway)
    // Simulate successful payment
    const paymentStatus = "completed";

    // Update order payment details
    order.paymentStatus = paymentStatus;
    order.paymentMethod = paymentMethod;
    order.paymentDate = new Date();

    // Save the updated order
    await order.save();

    res.json({ message: "Payment processed successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateInvoice = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Find the order by orderId from the database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Placeholder invoice generation logic
    const invoice = {
      orderId: order._id,
      total: order.totalPrice,
      Products: order.products,
      paymentMethod: order.paymentMethod,
      paymentDate: order.paymentDate,
      billingAddress: order.billingAddress,
      items: order.items,
    };

    // Send the invoice as response
    res.json({ message: "Invoice generated successfully", invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  calculateOrderTotal,
  applyDiscount,
  processPayment,
  generateInvoice,
};
