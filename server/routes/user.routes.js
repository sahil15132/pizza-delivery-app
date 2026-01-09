const express = require("express");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to user dashboard 🍕",
    user: req.user
  });
});

module.exports = router;
