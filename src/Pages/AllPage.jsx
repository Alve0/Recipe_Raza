import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { url } from "./Home";
import Loading from "../Components/login_reginster/Loading";

function AllPage() {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${url}/all-recipe`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  console.log(recipes);

  return (
    <div className="bg-[#f5ebe0] min-h-screen p-4">
      <h2 className="text-3xl font-bold text-[#4e4640] mb-6 text-center">
        All Recipes
      </h2>
      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loading />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-[#4e4640] text-lg">{error}</p>
        </div>
      ) : !recipes || recipes.length === 0 ? (
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

              <p className="text-[#4e4640] text-sm mb-2">
                <span className="font-medium">Cuisine:</span>{" "}
                {recipe.cuisineType || "N/A"}
              </p>

              <p className="text-[#4e4640] text-sm mb-2">
                <span className="font-medium">Time:</span>{" "}
                {recipe.prepTime ? `${recipe.prepTime} min` : "N/A"}
              </p>

              {recipe.categories && Array.isArray(recipe.categories) && (
                <div className="flex flex-wrap gap-1 mb-3">
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

              <Link
                to={`/recipe-details/${recipe._id}`}
                className="mt-auto bg-[#4e4640] !text-[#f5ebe0] py-1.5 rounded font-medium text-sm text-center hover:bg-[#3a2f2b]"
              >
                See Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllPage;
