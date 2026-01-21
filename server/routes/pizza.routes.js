const express = require("express");
const Pizza = require("../models/Pizza");
const { protect } = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const router = express.Router();

/* GET ALL PIZZAS (public) */
router.get("/", async (req, res) => {
  const pizzas = await Pizza.find();
  res.json(pizzas);
});

/* ADD PIZZA (admin only) */
router.post("/", protect, adminOnly, async (req, res) => {
  const pizza = await Pizza.create(req.body);
  res.status(201).json(pizza);
});

/* DELETE PIZZA (admin only) */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Pizza.findByIdAndDelete(req.params.id);
  res.json({ message: "Pizza deleted" });
});

module.exports = router;
