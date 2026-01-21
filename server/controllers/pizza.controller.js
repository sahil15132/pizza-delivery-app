const Pizza = require("../models/Pizza");

/* ADD PIZZA (Admin) */
exports.addPizza = async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);
    res.status(201).json(pizza);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL PIZZAS */
exports.getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
