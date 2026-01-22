const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const router = express.Router();

router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
    ]);
    res.json(stats[0] || { totalRevenue: 0, totalOrders: 0 });
  } catch (err) {
    res.status(500).json({ message: "Error calculating stats" });
  }
});

/* GET ALL ORDERS (Admin only) */
router.get("/orders", protect, adminOnly, async (req, res) => {
  try {
    // .populate('user') gets the customer's name and email from the User model
    const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

/* UPDATE ORDER STATUS (Admin only) */
router.patch("/orders/:id", protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;