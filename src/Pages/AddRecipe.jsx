import React, { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const AddRecipe = () => {
  const { user } = use(AuthContext);
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
      uid: user.uid,
    };
    const url = "http://localhost:3000/add-recipe";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(recipeData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    form.reset();
  };

  return (
    <div className="bg-[#f5ebe0] h-screen flex items-center justify-center p-4">
      <div className="max-w-[1080px]  mx-auto w-full ">
        <h3 className="text-5xl text-center font-bold my-5">Add Recipe</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              required
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
                className="block w-full p-2 border border-[#4e4640] rounded bg-[#d6c9b96e]"
              />
            </div>

            <div className="w-full">
              <h3 className="block text-sm font-medium text-[#4e4640] mb-1">
                Cuisine Type
              </h3>
              <select
                name="cuisineType"
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
                  <label key={cat} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="categories"
                      value={cat}
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
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
