import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { url } from "./Home";
import Loading from "../Components/login_reginster/Loading";

function Main() {
  const [topRecipes, setTopRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://www.recipetineats.com/tachyon/2025/05/B85-Beef-sausage-rolls-recipe_6.jpg?resize=1200%2C1500&zoom=0.54",
      title: "Discover Delicious Recipes",
      subtitle: "Explore a world of flavors with RecipeRaza!",
    },
    {
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      title: "Cook with Confidence",
      subtitle: "Easy-to-follow recipes for every skill level.",
    },
    {
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      title: "Share Your Creations",
      subtitle: "Join our community and inspire others!",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const fetchTopRecipes = async () => {
      try {
        const response = await fetch(`${url}/top-recipes`);
        if (!response.ok) {
          throw new Error("Failed to fetch top recipes");
        }
        const data = await response.json();
        setTopRecipes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTopRecipes();
  }, []);

  return (
    <div className="bg-[#f5ebe0] min-h-screen">
      <div className="relative w-full h-[400px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[1000px] z-[99] object-cover"
            />
            <div className="absolute inset-0 bg-[#0000005e]  bg-opacity-50 flex flex-col items-center justify-center text-center">
              <h2 className="text-4xl font-bold !text-white mb-2">
                {slide.title}
              </h2>
              <p className="text-xl !text-white">{slide.subtitle}</p>
            </div>
          </div>
        ))}
        {/* Slider Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Top Recipes Section */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#4e4640] mb-6 text-center">
          Top Recipes
        </h2>
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <Loading />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <p className="text-[#4e4640] text-lg">{error}</p>
          </div>
        ) : topRecipes.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <p className="text-[#4e4640] text-lg">No recipes found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-[#d6c9b96e] p-4 rounded-lg shadow-md flex flex-col"
              >
                {recipe.imageUrl ? (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <h3 className="text-lg font-bold text-[#4e4640] mb-2 line-clamp-2">
                  {recipe.title}
                </h3>
                <p className="text-[#4e4640] text-sm mb-2">
                  <span className="font-medium">Cuisine:</span>{" "}
                  {recipe.cuisineType || "N/A"}
                </p>
                <p className="text-[#4e4640] text-sm mb-3">
                  <span className="font-medium">Likes:</span>{" "}
                  {recipe.likeCount || 0}
                </p>
                <Link
                  to={`/recipe-details/${recipe._id}`}
                  className="mt-auto bg-[#4e4640] !text-[#f5ebe0] py-1.5 rounded font-medium text-sm text-center hover:bg-[#3a2f2b]"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-8">
          <Link
            to="/all-recipe"
            className="inline-block bg-[#4e4640] !text-[#f5ebe0] py-2 px-6 rounded font-medium text-base hover:bg-[#3a2f2b]"
          >
            See All Recipes
          </Link>
        </div>
      </section>

      <section className="py-12 bg-[#e3d5ca] max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#4e4640] mb-6 text-center">
          About Us
        </h2>
        <p className="text-[#4e4640] text-lg max-w-3xl mx-auto text-center">
          RecipeRaza is your go-to platform for discovering, sharing, and
          mastering delicious recipes from around the world. Whether you're a
          novice cook or a seasoned chef, our community is here to inspire and
          support your culinary journey.
        </p>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#4e4640] mb-6 text-center">
          Why Choose RecipeRaza?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-[#4e4640] mb-2">
              Diverse Recipes
            </h3>
            <p className="text-[#4e4640] text-sm">
              Explore cuisines from every corner of the globe, from spicy Indian
              curries to classic Italian pastas.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-[#4e4640] mb-2">
              Community Driven
            </h3>
            <p className="text-[#4e4640] text-sm">
              Share your own recipes and get feedback from a vibrant community
              of food lovers.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-[#4e4640] mb-2">
              Easy to Use
            </h3>
            <p className="text-[#4e4640] text-sm">
              Our intuitive interface makes finding and following recipes a
              breeze for all skill levels.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;
