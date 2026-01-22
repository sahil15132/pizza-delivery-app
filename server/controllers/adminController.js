const Order = require('../models/Order');
const Pizza = require('../models/Pizza');

exports.getAdminStats = async (req, res) => {
    try {
        const totalSales = await Order.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" }, totalOrders: { $sum: 1 } } }
        ]);
        res.status(200).json(totalSales[0] || { totalRevenue: 0, totalOrders: 0 });
    } catch (error) {
        res.status(500).json({ message: "Error fetching stats" });
    }
};

exports.addNewPizza = async (req, res) => {
    try {
        const newPizza = new Pizza(req.body);
        await newPizza.save();
        res.status(201).json({ message: "Pizza added successfully!" });
    } catch (error) {
        res.status(400).json({ message: "Error adding pizza" });
    }
};