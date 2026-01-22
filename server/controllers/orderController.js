exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;

    console.log("REQ ITEMS 👉", items);

    const order = await Order.create({
      user: req.user.id,
      items,
      totalPrice
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("ORDER ERROR 👉", err);
    res.status(500).json({ message: "Order failed" });
  }
};
