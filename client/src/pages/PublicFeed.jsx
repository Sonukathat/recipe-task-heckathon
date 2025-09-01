import { useEffect, useState } from "react";
import axios from "axios";

function PublicFeed() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get("https://recipe-task-heckathon.vercel.app/api/recipes/public")
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Public Recipe Feed</h2>
      <ul className="space-y-2">
        {recipes.map(r => (
          <li key={r._id} className="p-3 bg-white shadow rounded">
            <h3 className="font-semibold">{r.title}</h3>
            <p>{r.calories} cal</p>
            <small>By {r.user?.name}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PublicFeed;
