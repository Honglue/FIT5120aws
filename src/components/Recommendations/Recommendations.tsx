import React, { useState } from "react";
import "./Recommendations.css";
import InputBar from "./InputBar";
import Card from "./Card";
import Loading from "../Loading/loading";
import Image from "./Image"; // Import the Image component

const Recommendations: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch recipes based on ingredients
  const fetchRecipes = async (ingredients: string) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        "https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: ingredients.split(",").map((item) => item.trim()),
          }),
        }
      );
      const result = await response.json();
      const parsedData = JSON.parse(result.body);
      setRecipes(parsedData.dishes || []);
    } catch (err: any) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle the result from InputBar (ingredients)
  const handleSearch = (ingredients: string) => {
    fetchRecipes(ingredients);
  };

  return (
    <div className="recommend-page-container">
      {/* Image Upload and Recognition Component */}
      <Image />

      {/* Search by Ingredients Input Bar */}
      <InputBar
        onSearch={handleSearch}
        loading={loading}
        setLoading={setLoading}
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
            The recommended dishes help you to achieve your required nutrition
            intake a day. <br />
            Get started by searching different ingredients or uploading an
            image of an ingredient.
          </p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
