const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");
const Order = require("../models/Order");

const router = express.Router();

// USER: create order
router.post("/", protect, async (req, res) => {
  try {
    const { items, totalPrice } = req.body;

    // Basic validation - prevent empty orders
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty. Add pizzas before placing an order." });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice: totalPrice,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Order creation failed" });
  }
});

// USER: get my orders
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.pizza");
    res.json(orders);
  } catch (err) {
    console.error("Fetch my orders error:", err);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.pizza")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Fetch all orders error:", err);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

router.put("/:id/status", protect, adminOnly, async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;