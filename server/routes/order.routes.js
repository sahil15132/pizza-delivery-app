const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");
const Order = require("../models/Order");

const router = express.Router();

// USER: create order
router.post("/", protect, async (req, res) => {
  const order = await Order.create({
    user: req.user._id,
    pizzas: req.body.pizzas,
    totalPrice: req.body.totalPrice,
  });

  res.status(201).json(order);
});

// USER: get my orders
router.get("/my", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("pizzas.pizza");
  res.json(orders);
});

router.get("/", protect, adminOnly, async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("pizzas.pizza");

  res.json(orders);
});

router.put("/:id/status", protect, adminOnly, async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;
  await order.save();

  res.json(order);
});


module.exports = router;
