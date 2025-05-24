import React, { useEffect, useState, useContext, use } from "react";
import { useParams } from "react-router";
import { BiSolidLike } from "react-icons/bi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Loading from "../Components/login_reginster/Loading";
import { url } from "./Home";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../Provider/AuthProvider";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = use(AuthContext);
  const userId = user?.uid || null;
  const [hasLiked, setHasLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `${url}/recipe-details/${id}?uid=${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch recipe");
        const data = await response.json();

        setRecipe(data);
        setIsBookmarked(data.isBookmarked || false);
        setHasLiked(data.hasLiked || false);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id && userId) fetchRecipe();
  }, [id, userId]);

  const handleLike = async (recipeId) => {
    if (!userId) {
      alert("Please log in to like this recipe");
      return;
    }
    if (hasLiked) {
      alert("You have already liked this recipe");
      return;
    }

    try {
      const updatedLikeCount = (recipe.likeCount || 0) + 1;
      const response = await fetch(`${url}/update-like/${userId}/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likeCount: updatedLikeCount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update like count");
      }

      setRecipe((prev) => ({
        ...prev,
        likeCount: updatedLikeCount,
      }));
      setHasLiked(true);
    } catch (err) {
      console.error("Error liking recipe:", err.message);
      alert(err.message);
    }
  };
  const handleBookmark = async (recipeId, uid) => {
    if (!uid) return;

    try {
      const response = await fetch(`${url}/bookmark/${uid}/${recipeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) throw new Error("Failed to toggle bookmark");

      const data = await response.json();
      setIsBookmarked(data.isBookmarked);
    } catch (err) {
      console.error("Error toggling bookmark:", err.message);
    }
  };

  return (
    <div className="bg-[#f5ebe0] min-h-screen p-4">
      <h2 className="text-3xl font-bold text-[#4e4640] mb-6 text-center">
        Recipe Details
      </h2>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Loading />
        </div>
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
          <div className="bg-[#d6c9b96e] p-4 rounded-lg shadow-md flex flex-col">
            {recipe.imageUrl && (
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-128 object-cover rounded-lg mb-3"
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
            <div className="flex items-center justify-between text-[#4e4640] text-sm mb-2">
              <p>
                <span className="font-medium">Likes:</span>{" "}
                {recipe.likeCount || 0}
              </p>
              <div className="flex gap-2">
                <button
                  data-tooltip-id="view-recipe"
                  data-tooltip-content="like"
                  data-tooltip-place="top"
                  onClick={() => handleLike(recipe._id)}
                  className={`text-[#4e4640] hover:text-[#3a2f2b] ${
                    hasLiked ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!userId || hasLiked}
                  title={hasLiked ? "Already liked" : "Like"}
                >
                  <BiSolidLike size={20} />
                </button>
                <button
                  data-tooltip-id="view-recipe"
                  data-tooltip-content="bookmark"
                  data-tooltip-place="top"
                  onClick={() => handleBookmark(recipe._id, userId)}
                  className="text-[#4e4640] hover:text-[#3a2f2b]"
                  title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
                  disabled={!userId}
                >
                  {isBookmarked ? (
                    <FaBookmark size={20} />
                  ) : (
                    <FaRegBookmark size={20} />
                  )}
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
      <Tooltip id="view-recipe" />
    </div>
  );
}

export default RecipeDetails;
