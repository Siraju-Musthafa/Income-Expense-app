const express = require("express");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

/* =========================
   ALL TRANSACTIONS CRUD
========================= */

// Get all transactions
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Add transaction
router.post("/transactions", async (req, res) => {
  try {
    const { type, title, amount, category, date, note } = req.body;

    if (!type || !title || !amount || !category) {
      return res.status(400).json({
        message: "Type, title, amount and category are required",
      });
    }

    const transaction = await Transaction.create({
      userId: req.user.id,
      type,
      title,
      amount,
      category,
      date,
      note,
    });

    res.status(201).json({
      message: "Transaction added successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Update transaction
router.put("/transactions/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Delete transaction
router.delete("/transactions/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

/* =========================
   INCOME CRUD
========================= */

// Get all income
router.get("/income", async (req, res) => {
  try {
    const income = await Transaction.find({
      userId: req.user.id,
      type: "income",
    }).sort({ date: -1 });

    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Add income
router.post("/income", async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
        message: "Title, amount and category are required",
      });
    }

    const income = await Transaction.create({
      userId: req.user.id,
      type: "income",
      title,
      amount,
      category,
      date,
      note,
    });

    res.status(201).json({
      message: "Income added successfully",
      data: income,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Update income
router.put("/income/:id", async (req, res) => {
  try {
    const income = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
        type: "income",
      },
      {
        ...req.body,
        type: "income",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({
      message: "Income updated successfully",
      data: income,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Delete income
router.delete("/income/:id", async (req, res) => {
  try {
    const income = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
      type: "income",
    });

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({
      message: "Income deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

/* =========================
   EXPENSE CRUD
========================= */

// Get all expense
router.get("/expense", async (req, res) => {
  try {
    const expense = await Transaction.find({
      userId: req.user.id,
      type: "expense",
    }).sort({ date: -1 });

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Add expense
router.post("/expense", async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
        message: "Title, amount and category are required",
      });
    }

    const expense = await Transaction.create({
      userId: req.user.id,
      type: "expense",
      title,
      amount,
      category,
      date,
      note,
    });

    res.status(201).json({
      message: "Expense added successfully",
      data: expense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Update expense
router.put("/expense/:id", async (req, res) => {
  try {
    const expense = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
        type: "expense",
      },
      {
        ...req.body,
        type: "expense",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Delete expense
router.delete("/expense/:id", async (req, res) => {
  try {
    const expense = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
      type: "expense",
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

module.exports = router;