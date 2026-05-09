const express = require("express");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Add category
router.post("/", async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        message: "Name and type are required",
      });
    }

    const category = await Category.create({
      userId: req.user.id,
      name,
      type,
    });

    res.status(201).json({
      message: "Category added successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Update category
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
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

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// Delete category
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
});

module.exports = router;