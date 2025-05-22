import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import RecipeDetails from "./RecipeDetails";
import { AuthContext } from "../Provider/AuthProvider";
import Update from "./Update";

function MyRecipes() {
  const { user } = use(AuthContext);
  const { id } = useParams();
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log(user);

  function handleDelete(id) {
    const url = `http://localhost:3000/my-recipe/${id}?uid=${user.uid}`;
    const data = {
      jsonId: id,
      uid: user.uid,
    };

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Deleted:", data);
        // Remove the deleted recipe from the list
        setRecipes((prevRecipes) => prevRecipes.filter((r) => r._id !== id));
      })
      .catch((error) => console.error("Error:", error));
  }

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(` http://localhost:3000/my-recipe/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        console.log(data);
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    } else {
      setError("No recipe ID provided");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#f5ebe0] min-h-screen flex items-center justify-center p-4">
        <p className="text-[#4e4640] text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f5ebe0] min-h-screen flex items-center justify-center p-4">
        <p className="text-[#4e4640] text-lg">Error: {error}</p>
      </div>
    );
  }

  if (!recipes.length) {
    return <p>No recipes found</p>;
  }
  function HendelClicked(id) {
    navigate(`/recipe-details/${id}`);
  }
  return (
    <div className="bg-[#f5ebe0]  min-h-screen p-4">
      <h2 className="text-3xl font-bold text-[#4e4640] mb-6 text-center">
        My Recipes
      </h2>
      {recipes.length === 0 ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-[#4e4640] text-lg">No recipes found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-[#d6c9b96e] p-4 rounded-lg shadow-md flex flex-col"
            >
              <div onClick={() => HendelClicked(recipe._id)}>
                {recipe.imageUrl && (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}

                <h3 className="text-lg font-bold text-[#4e4640] mb-2 line-clamp-2">
                  {recipe.title}
                </h3>

                <div className="flex justify-between text-[#4e4640] text-sm mb-2">
                  <p>
                    <span className="font-medium">Cuisine:</span>{" "}
                    {recipe.cuisineType || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{" "}
                    {recipe.prepTime ? `${recipe.prepTime} min` : "N/A"}
                  </p>
                </div>

                {recipe.categories && Array.isArray(recipe.categories) && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {recipe.categories.map((category, index) => (
                      <span
                        key={index}
                        className="bg-[#e3d5ca] text-[#4e4640] px-2 py-0.5 rounded-full text-xs"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-[#4e4640] text-sm mb-2">
                  <span className="font-medium">Likes:</span>{" "}
                  {recipe.likeCount || 0}
                </p>

                <div className="mb-2">
                  <h4 className="text-sm font-semibold text-[#4e4640]">
                    Ingredients
                  </h4>
                  <p className="text-[#4e4640] text-xs whitespace-pre-line line-clamp-2">
                    {recipe.ingredients || "No ingredients"}
                  </p>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-semibold text-[#4e4640]">
                    Instructions
                  </h4>
                  <p className="text-[#4e4640] text-xs whitespace-pre-line line-clamp-2">
                    {recipe.instructions || "No instructions"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => navigate(`/update/${recipe._id}`)}
                  className="flex-1 btn bg-[#e3d5ca] py-1.5 rounded font-medium border-[#4e4640] border-2 text-[#4e4640] text-sm hover:bg-[#d6c9b9]"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="flex-1 btn bg-[#4e4640] !text-white py-1.5 rounded font-medium text-sm hover:bg-[#3a2f2b] hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRecipes;
