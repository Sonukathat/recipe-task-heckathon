import express from "express";
import Recipe from "../models/Recipe.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create Recipe
router.post("/", authMiddleware, async (req, res) => {
  try {
    const recipe = new Recipe({
      title: req.body.title,
      calories: req.body.calories,
      user: req.user, // token se user
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get All Recipes (Logged in user)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update Recipe
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete Recipe
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
