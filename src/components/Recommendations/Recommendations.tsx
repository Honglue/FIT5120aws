import React, { useState } from "react";
import "./Recommendations.css";
import InputBar from "./InputBar";
import Card from "./Card";
import Loading from "../Loading/loading";

const Recommendations: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecipes = async (ingredients: string, filters: any) => {
    setError(null);
    setLoading(true);

    try {
      // Log the values being used in the query
      console.log("Ingredients:", ingredients);
      console.log("Cuisine Type:", filters.cuisineType);
      console.log("Health Labels:", filters.healthLabels);

      const queryParams = new URLSearchParams({
        ingredients: ingredients
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean) // Remove any empty values
          .join(","),
        cuisineType: filters.cuisine || "", // Use empty string if undefined
        health: filters.healthLabels?.join(",") || "", // Use empty string if undefined
      }).toString();

      console.log("Query Params:", queryParams); // Log the query parameters

      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?${queryParams}`, // Add CORS proxy for dev
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      setRecipes(result.hits || []);
    } catch (err: any) {
      console.error(err); // Log the error
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle the result from InputBar (ingredients and filters)
  const handleSearch = (ingredients: string, filters: any) => {
    fetchRecipes(ingredients, filters);
  };

  return (
    <div className="recommend-page-container">
      {/* Search by Ingredients Input Bar */}
      <InputBar
        onSearch={handleSearch}
        loading={loading}
        // setLoading={setLoading}
      />

      {/* Show loading spinner or message */}
      {loading && <Loading />}

      {/* Display error message */}
      {error && !loading && <p className="error-message">{error}</p>}

      {/* Display search results in Card component */}
      <div className="results-container">
        {!loading && recipes.length > 0 && (
          <div className="results-content">
            <h4 style={{ textAlign: "left", fontWeight: "bold" }}>
              Dishes Results
            </h4>
            <div className="recommend-page">
              {recipes.map((recipe, index) => (
                <Card key={index} data={recipe} />
              ))}
            </div>
          </div>
        )}

        {!loading && recipes.length === 0 && !error && (
          <p>
            <span style={{ color: "#6366f1" }}>
              Uploaded images will be included in the search
            </span>
            <br />
            The recommended dishes help you to achieve your required nutrition
            intake a day. <br />
            Get started by searching different ingredients or uploading an image
            of an ingredient.
          </p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
