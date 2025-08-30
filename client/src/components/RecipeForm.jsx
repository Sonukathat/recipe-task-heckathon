import { useState } from "react";
import axios from "axios";

function RecipeForm({ fetchRecipes }) {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/recipes",
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
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-4">
      <h3 className="text-lg font-bold mb-2">Add Recipe</h3>
      <input
        type="text"
        placeholder="Recipe Title"
        className="border p-2 w-full mb-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Calories"
        className="border p-2 w-full mb-2 rounded"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        required
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Add Recipe
      </button>
    </form>
  );
}

export default RecipeForm;
