import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BiSolidLike } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import Loading from "../Components/login_reginster/Loading";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/recipe-details/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        console.log(data);
        setRecipe(data);
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

  console.log(recipe);

  return (
    <div>
      <div className="bg-[#f5ebe0] min-h-screen p-4">
        <h2 className="text-3xl font-bold text-[#4e4640] mb-6 text-center">
          Recipe Details
        </h2>
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="text-[#4e4640] text-lg">{error}</p>
          </div>
        ) : !recipe ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="text-[#4e4640] text-lg">No recipe found</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#d6c9b96e] p-4  rounded-lg shadow-md flex flex-col">
              {recipe.imageUrl && (
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-128  object-cover rounded-lg mb-3"
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

              {/* have to make use the like and bookmark function work */}

              <div className="flex items-center justify-between text-[#4e4640] text-sm mb-2">
                <p>
                  <span className="font-medium">Likes:</span>{" "}
                  {recipe.likeCount || 0}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLike(recipe._id)}
                    className="text-[#4e4640] hover:text-[#3a2f2b]"
                    title="Like"
                  >
                    <BiSolidLike size={20} />
                  </button>
                  <button
                    onClick={() => handleBookmark(recipe._id)}
                    className="text-[#4e4640] hover:text-[#3a2f2b]"
                    title="Bookmark"
                  >
                    <CiBookmark size={20} />
                  </button>
                </div>
              </div>

              <div className="mb-2">
                <h4 className="text-sm font-semibold text-[#4e4640]">
                  Ingredients
                </h4>
                <p className="text-[#4e4640] text-xs whitespace-pre-line">
                  {recipe.ingredients || "No ingredients"}
                </p>
              </div>

              <div className="mb-3">
                <h4 className="text-sm font-semibold text-[#4e4640]">
                  Instructions
                </h4>
                <p className="text-[#4e4640] text-xs whitespace-pre-line">
                  {recipe.instructions || "No instructions"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;
