import React from "react";

const AddRecipe = () => {
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
    };

    console.log("Recipe Data:", recipeData);

    form.reset();
  };

  return (
    <div className="bg-[#f5ebe0] h-screen items-center flex justify-center px-4">
      <div className="max-w-[1080px]  mx-auto ">
        <h3 className="text-5xl text-center font-bold my-5">Add Recipe</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium ">Title</label>
            <input
              type="text"
              name="title"
              required
              className="mt-1 block  w-full p-2 border border-[#4e4640] rounded bg-[#d6c9b96e]"
            />
          </div>
          <div>
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

          <div>
            <label className="block  text-sm font-medium text-[#4e4640]">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://example.com/image.jpg"
              className="mt-1 block w-full p-2 border border-[#4e4640] rounded bg-[#d6c9b96e]"
            />
          </div>
          <div>
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
          <div className="flex gap-4 justify-between items-center">
            <div className="w-full">
              <label className="block text-sm font-medium text-[#4e4640]">
                Preparation Time (minutes)
              </label>
              <input
                type="number"
                name="prepTime"
                required
                min="1"
                className="mt-1 block w-full p-2 border border-[#4e4640] rounded bg-[#d6c9b96e]"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-[#4e4640]">
                Cuisine Type
              </label>
              <select
                name="cuisineType"
                className="mt-1 block w-full p-2 border border-[#4e4640] rounded bg-[#d6c9b96e] "
              >
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          <div>
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
