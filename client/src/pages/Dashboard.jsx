import { useEffect, useState } from "react";
import axios from "axios";
import RecipeForm from "../components/RecipeForm"; // path check karo

function Dashboard() {
  const [recipes, setRecipes] = useState([]);

  // fetch function jo RecipeForm ko pass hogi
  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/recipes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(res.data);
    } catch (err) {
      console.error("Fetch Recipes Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // refresh list
      fetchRecipes();
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);
    }
  };

  const handleUpdate = async (recipe) => {
    const newTitle = prompt("New title", recipe.title);
    const newCalories = prompt("New calories", recipe.calories);
    if (!newTitle || !newCalories) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/recipes/${recipe._id}`,
        { title: newTitle, calories: Number(newCalories) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRecipes();
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6">
      {/* PASS THE FUNCTION HERE */}
      <RecipeForm fetchRecipes={fetchRecipes} />

      <h2 className="text-xl font-bold mb-4">Your Recipes</h2>
      {recipes.map((r) => (
        <div key={r._id} className="p-3 border my-2 rounded flex justify-between">
          <div>
            <h3 className="font-semibold">{r.title}</h3>
            <p>Calories: {r.calories}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleUpdate(r)} className="bg-yellow-500 text-white px-2 rounded">Edit</button>
            <button onClick={() => handleDelete(r._id)} className="bg-red-500 text-white px-2 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
