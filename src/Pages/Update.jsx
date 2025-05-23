import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Components/login_reginster/Loading";
import { url } from "./Home";

function Update() {
  const { user } = use(AuthContext);
  const { id } = useParams(); // updated for clarity
  console.log(id, user.uid);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${url}/recipe-details/${id}`);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const recipeData = {
      imageUrl: formData.get("imageUrl"),
      title: formData.get("title"),
      ingredients: formData.get("ingredients"),
      instructions: formData.get("instructions"),
      cuisineType: formData.get("cuisineType"),
      prepTime: formData.get("prepTime"),
      categories: formData.getAll("categories"),
    };

    fetch(`${url}/recipe-details/${user.uid}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    navigate("/");
  };

  return (
    <div>
      <div className="bg-[#f5ebe0] min-h-screen p-4">
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
          <div className="bg-[#f5ebe0] h-screen flex items-center justify-center p-4">
            <div className="max-w-[1080px]  mx-auto w-full ">
              <h3 className="text-5xl text-center font-bold my-5">
                Update Recipe
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={recipe.title}
                    className="mt-1 block w-full p-2 border border-[#4e4640] rounded bg-[#d6c9b96e]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#4e4640]">
                    Ingredients
                  </label>
                  <textarea
                    name="ingredients"
                    required
                    defaultValue={recipe.ingredients}
                    className="mt-1 block w-full p-2 border border-[#4e4640] rounded bg-[#d6c9b96e]"
                    rows="4"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#4e4640]">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    defaultValue={recipe.imageUrl}
                    className="mt-1 block w-full p-2 border border-[#4e4640] rounded bg-[#d6c9b96e]"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#4e4640]">
                    Instructions
                  </label>
                  <textarea
                    name="instructions"
                    required
                    defaultValue={recipe.instructions}
                    className="mt-1 block w-full p-2 border border-[#4e4640] rounded bg-[#d6c9b96e]"
                    rows="4"
                  ></textarea>
                </div>

                <div className="flex gap-4 items-start mb-4 justify-between">
                  <div className="w-full">
                    <h3 className="block text-sm font-medium text-[#4e4640] mb-1">
                      Preparation Time
                    </h3>
                    <input
                      type="number"
                      placeholder="minute"
                      name="prepTime"
                      required
                      min="1"
                      defaultValue={recipe.prepTime}
                      className="block w-full p-2 border border-[#4e4640] rounded bg-[#d6c9b96e]"
                    />
                  </div>

                  <div className="w-full">
                    <h3 className="block text-sm font-medium text-[#4e4640] mb-1">
                      Cuisine Type
                    </h3>
                    <select
                      name="cuisineType"
                      defaultValue={recipe.cuisineType}
                      className="block w-full p-2 border border-[#4e4640] rounded bg-[#d6c9b96e]"
                    >
                      <option value="Italian">Italian</option>
                      <option value="Mexican">Mexican</option>
                      <option value="Indian">Indian</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#4e4640] mb-2">
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map(
                      (cat) => (
                        <label
                          key={cat}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            name="categories"
                            value={cat}
                            defaultChecked={recipe.categories?.includes(cat)}
                            className="accent-[#4e4640]"
                          />
                          <span className="text-[#4e4640]">{cat}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <button type="submit" className="w-full bg-[#e3d5ca] btn">
                    Update Recipe
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Update;
