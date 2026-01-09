const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

/* CREATE ORDER */
router.post("/", protect, async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user._id,   // ✅ FIXED
      pizzas: req.body.pizzas,
      totalPrice: req.body.totalPrice
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET MY ORDERS */
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("pizzas.pizza");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
