const express = require("express");
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/summary", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const transactions = await Transaction.find({
      userId: req.user.id,
    });

    const totalIncome = transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    const balance = totalIncome - totalExpense;

    const recentTransactions = await Transaction.find({
      userId: req.user.id,
    })
      .populate("userId", "name email")
      .sort({ date: -1 })
      .limit(5);

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      totalIncome,
      totalExpense,
      balance,
      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
});

module.exports = router;