import Recipe from "../models/Recipe.js";

// Create Recipe
export const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create({ ...req.body, user: req.user.id });
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All My Recipes
export const getMyRecipes = async (req, res) => {
  const recipes = await Recipe.find({ user: req.user.id });
  res.json(recipes);
};

// Public Feed
export const getPublicRecipes = async (req, res) => {
  const recipes = await Recipe.find({ isPublic: true });
  res.json(recipes);
};
