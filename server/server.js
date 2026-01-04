const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize app FIRST
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Pizza Delivery API is running 🍕");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port 5000 🚀");
    });
  })
  .catch((err) => {
    console.error("MongoDB Error ❌", err);
  });
