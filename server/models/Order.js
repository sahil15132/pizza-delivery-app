const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pizzas: [
      {
        pizza: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
        },
        quantity: Number,
      },
    ],
    totalPrice: Number,
    status: {
      type: String,
      default: "Preparing",
      enum: ["Preparing", "Baking", "Out for delivery", "Delivered"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
