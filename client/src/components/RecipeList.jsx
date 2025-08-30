import { useEffect, useState } from "react";
import axios from "axios";
import RecipeForm from "./RecipeForm";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recipes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setRecipes(res.data);
    } catch (err) {
      console.error("Fetch Recipes Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Recipes</h2>

      {/* ✅ fetchRecipes ko as prop pass karo */}
      <RecipeForm fetchRecipes={fetchRecipes} />

      <ul className="mt-6 space-y-2">
        {recipes.map((r) => (
          <li key={r._id} className="border p-3 rounded">
            <strong>{r.title}</strong> - {r.calories} Calories
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
