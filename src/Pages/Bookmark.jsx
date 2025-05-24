import React, { use, useEffect, useState } from "react";
import Loading from "../Components/login_reginster/Loading";
import { url } from "./Home";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

function Bookmark() {
  const [recipes, setRecipes] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const { user } = use(AuthContext);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${url}/bookmarks/${user.uid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setRecipes(data);
        setFilteredRecipes(data);
        const cuisines = [
          ...new Set(data.map((recipe) => recipe.cuisineType).filter(Boolean)),
        ];
        const categories = [
          ...new Set(data.flatMap((recipe) => recipe.categories || [])),
        ];
        setCuisineOptions(cuisines);
        setCategoryOptions(categories);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    if (!recipes) return;

    const filtered = recipes.filter((recipe) => {
      const matchesCuisine = cuisineFilter
        ? recipe.cuisineType === cuisineFilter
        : true;
      const matchesCategories =
        categoryFilters.length > 0
          ? categoryFilters.every((category) =>
              recipe.categories?.includes(category)
            )
          : true;
      return matchesCuisine && matchesCategories;
    });

    setFilteredRecipes(filtered);
  }, [recipes, cuisineFilter, categoryFilters]);

  const handleCuisineChange = (e) => {
    setCuisineFilter(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilters((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };
  const handleRemoveBookmark = async (id) => {
    try {
      const userId = user.uid;
      const response = await fetch(`${url}/bookmark/${userId}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove bookmark");
      }

      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
      setFilteredRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (err) {
      console.error(err);
      alert("Could not remove bookmark");
    }
  };

  const clearFilters = () => {
    setCuisineFilter("");
    setCategoryFilters([]);
    setFilteredRecipes(recipes);
  };

  return (
    <div className="bg-[#f5ebe0] min-h-screen p-4">
      <h2 className="text-3xl font-bold text-[#4e4640] mb-6 text-center">
        Bookmark
      </h2>

      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-1/3">
            <label
              htmlFor="cuisine"
              className="text-[#4e4640] font-medium text-sm"
            >
              Filter by Cuisine:
            </label>
            <select
              id="cuisine"
              value={cuisineFilter}
              onChange={handleCuisineChange}
              className="w-full mt-1 p-2 rounded-lg bg-[#e3d5ca] text-[#4e4640] text-sm focus:outline-none focus:ring-2 focus:ring-[#4e4640]"
            >
              <option value="">All Cuisines</option>
              {cuisineOptions.map((cuisine, index) => (
                <option key={index} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-2/3">
            <span className="text-[#4e4640] font-medium text-sm">
              Filter by Category:
            </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {categoryOptions.map((category, index) => (
                <label
                  key={index}
                  className="flex items-center gap-1 text-[#4e4640] text-sm"
                >
                  <input
                    type="checkbox"
                    checked={categoryFilters.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="accent-[#4e4640]"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {(cuisineFilter || categoryFilters.length > 0) && (
            <button
              onClick={clearFilters}
              className="bg-[#4e4640] !text-[#f5ebe0] py-1.5 px-4 rounded font-medium text-sm hover:bg-[#3a2f2b]"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loading />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-[#4e4640] text-lg">{error}</p>
        </div>
      ) : !filteredRecipes || filteredRecipes.length === 0 ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-[#4e4640] text-lg">
            No recipes match your filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredRecipes.map((recipe) => (
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

              <button
                onClick={() => handleRemoveBookmark(recipe._id)}
                className="mt-2 bg-transparent  py-1 px-2 rounded text-sm border-2 border-[#4e4640] btn"
              >
                Remove Bookmark
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookmark;
