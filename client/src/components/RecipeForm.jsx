import { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

function RecipeForm({ fetchRecipes }) {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://recipe-task-heckathon.vercel.app/api/recipes",
        { title, calories: Number(calories) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (typeof fetchRecipes === "function") {
        await fetchRecipes();
      }

      setTitle("");
      setCalories("");
    } catch (err) {
      console.error("Recipe Add Error:", err.response?.data || err.message);
      alert("Recipe add failed ❌ — check console for details");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-6 shadow-lg rounded-2xl mb-6 border border-purple-200"
    >
      <h3 className="text-xl font-bold mb-4 text-purple-700">
        ➕ Add a New Recipe
      </h3>

      {/* Recipe Title */}
      <input
        type="text"
        placeholder="Recipe Title"
        className="border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none p-3 w-full mb-3 rounded-lg transition"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Calories */}
      <input
        type="number"
        placeholder="Calories"
        className="border border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none p-3 w-full mb-4 rounded-lg transition"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow hover:from-green-600 hover:to-green-700 transition w-full"
      >
        <FaPlus /> Add Recipe
      </button>
    </form>
  );
}

export default RecipeForm;
