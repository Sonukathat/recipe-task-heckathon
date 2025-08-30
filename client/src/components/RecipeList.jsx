// import { useEffect, useState } from "react";
// import axios from "axios";
// import RecipeForm from "./RecipeForm";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

// function RecipeList() {
//   const [recipes, setRecipes] = useState([]);
//   const [likedRecipes, setLikedRecipes] = useState([]);

//   const fetchRecipes = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/recipes", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setRecipes(res.data);
//     } catch (err) {
//       console.error("Fetch Recipes Error:", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchRecipes();
//   }, []);

//   const toggleLike = (id) => {
//     if (likedRecipes.includes(id)) {
//       setLikedRecipes(likedRecipes.filter((rid) => rid !== id));
//     } else {
//       setLikedRecipes([...likedRecipes, id]);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">
//         🍴 My Recipes
//       </h2>

//       {/* Recipe Form */}
//       <RecipeForm fetchRecipes={fetchRecipes} />

//       {/* Recipe Cards Grid */}
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {recipes.map((r) => (
//           <div
//             key={r._id}
//             className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200
//                        border border-purple-300 shadow-lg rounded-3xl p-5 flex flex-col justify-between
//                        hover:from-pink-300 hover:via-purple-300 hover:to-blue-300 hover:shadow-2xl
//                        transition duration-300"
//           >
//             <div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">{r.title}</h3>
//               <p className="text-gray-700">{r.calories} Calories</p>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-between items-center mt-4">
//               {/* Like Button */}
//               <button
//                 onClick={() => toggleLike(r._id)}
//                 className="p-2 rounded-full hover:bg-gray-100 transition"
//               >
//                 {likedRecipes.includes(r._id) ? (
//                   <AiFillHeart className="text-3xl text-pink-500" />
//                 ) : (
//                   <AiOutlineHeart className="text-3xl text-gray-500" />
//                 )}
//               </button>

//               {/* Optional: Edit/Delete buttons if needed */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RecipeList;
