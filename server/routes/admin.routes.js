const express = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
const { protect } = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const router = express.Router();

// GET ADMIN STATS
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
    console.error("Admin stats error:", err);
    res.status(500).json({ message: "Error calculating stats" });
  }
});

/* GET ALL ORDERS (Admin only) */
router.get("/orders", protect, adminOnly, async (req, res) => {
  try {
    // Use items.pizza to match Order schema
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.pizza")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("Admin fetch orders error:", err);
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
    ).populate("items.pizza").populate("user", "name email");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("Admin update order error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

/* GET ALL USERS (Admin only) */
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("Admin fetch users error:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

/* UPDATE USER ROLE (Admin only) */
router.patch("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const { role } = req.body;
    if (!role || !["customer", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Admin update user error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

/* DELETE USER (Admin only) */
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Admin delete user error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;