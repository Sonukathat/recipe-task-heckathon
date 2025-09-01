import { useEffect, useState } from "react";
import axios from "axios";
import RecipeForm from "../components/RecipeForm";
import { FaHeart } from "react-icons/fa";

function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);

  // fetch function jo RecipeForm ko pass hogi
  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://recipe-task-heckathon.vercel.app/api/recipes/get", {
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
      await axios.delete(`https://recipe-task-heckathon.vercel.app/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        `https://recipe-task-heckathon.vercel.app/api/recipes/${recipe._id}`,
        { title: newTitle, calories: Number(newCalories) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRecipes();
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
    }
  };

  // toggle favourite locally
  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4">
      {/* Recipe Form */}
      <RecipeForm fetchRecipes={fetchRecipes} />

      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
        🍴 Your Recipes
      </h2>

      {/* Recipes Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((r) => (
          <div
            key={r._id}
            className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200
                       border border-purple-300 shadow-lg rounded-3xl p-5 flex flex-col justify-between
                       hover:from-pink-300 hover:via-purple-300 hover:to-blue-300 hover:shadow-2xl
                       transition duration-300"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{r.title}</h3>
              <p className="text-gray-700">Calories: {r.calories}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              {/* Favourite Heart */}
              <button onClick={() => toggleFavourite(r._id)} className="p-2 rounded-full hover:bg-gray-100 transition">
                <FaHeart
                  className={`text-2xl transition duration-300 cursor-pointer ${
                    favourites.includes(r._id) ? "text-pink-500" : "text-gray-400"
                  }`}
                />
              </button>

              {/* Edit / Delete */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(r)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(r._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
