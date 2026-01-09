const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    pizzas: [
      {
        pizza: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza"
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "delivered"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
