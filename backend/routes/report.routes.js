const express = require("express");
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const {
      reportType = "daily",
      type,
      category,
      fromDate,
      toDate,
    } = req.query;

    const match = {
      userId: new mongoose.Types.ObjectId(req.user.id),
    };

    if (type && type !== "all") {
      match.type = type;
    }

    if (category && category !== "all") {
      match.category = category;
    }

    if (fromDate || toDate) {
      match.date = {};

      if (fromDate) {
        match.date.$gte = new Date(fromDate);
      }

      if (toDate) {
        match.date.$lte = new Date(toDate);
      }
    }

    let dateFormat = "%Y-%m-%d";

    if (reportType === "monthly") {
      dateFormat = "%Y-%m";
    }

    if (reportType === "yearly") {
      dateFormat = "%Y";
    }

    const report = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            period: {
              $dateToString: {
                format: dateFormat,
                date: "$date",
              },
            },
            type: "$type",
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.period": 1,
        },
      },
    ]);

    const transactions = await Transaction.find(match).sort({ date: -1 });

    const totalIncome = transactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = transactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    const categories = await Transaction.distinct("category", {
      userId: req.user.id,
    });

    res.status(200).json({
      reportType,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      report,
      transactions,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server error",
    });
  }
});

module.exports = router;