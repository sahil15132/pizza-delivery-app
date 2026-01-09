const express = require("express");
const Pizza = require("../models/Pizza");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

/* GET ALL PIZZAS (public) */
router.get("/", async (req, res) => {
  const pizzas = await Pizza.find();
  res.json(pizzas);
});

/* ADD PIZZA (protected) */
router.post("/", protect, async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);
    res.status(201).json(pizza);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* UPDATE PIZZA */
router.put("/:id", protect, async (req, res) => {
  try {
    const updatedPizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPizza);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* DELETE PIZZA */
router.delete("/:id", protect, async (req, res) => {
  try {
    await Pizza.findByIdAndDelete(req.params.id);
    res.json({ message: "Pizza deleted 🍕" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
