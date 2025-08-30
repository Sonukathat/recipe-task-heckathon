import { useEffect, useState } from "react";
import axios from "axios";
import RecipeForm from "./RecipeForm";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // ❤️ icons

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]); // ✅ liked state

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recipes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRecipes(res.data);
    } catch (err) {
      console.error("Fetch Recipes Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // ✅ toggle like function
  const toggleLike = (id) => {
    if (likedRecipes.includes(id)) {
      setLikedRecipes(likedRecipes.filter((rid) => rid !== id));
    } else {
      setLikedRecipes([...likedRecipes, id]);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Recipes</h2>

      {/* ✅ form ko recipes refresh karne ka prop diya */}
      <RecipeForm fetchRecipes={fetchRecipes} />

      <ul className="mt-6 space-y-2">
        {recipes.map((r) => (
          <li
            key={r._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <strong>{r.title}</strong> - {r.calories} Calories
            </div>

            {/* ❤️ Like Button (React Icons) */}
            <button
              onClick={() => toggleLike(r._id)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              {likedRecipes.includes(r._id) ? (
                <AiFillHeart className="text-2xl text-pink-500" />
              ) : (
                <AiOutlineHeart className="text-2xl text-gray-500" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
