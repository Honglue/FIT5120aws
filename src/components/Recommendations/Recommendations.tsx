import React, { useState } from "react";
import "./Recommendations.css";
import InputBar from "./InputBar";
import Card from "./Card";
import Loading from "../Loading/loading";

const Recommendations: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [isInputNotNone, setIsInputNotNone] = useState<boolean>(false);

  // State for diet labels
  const [dietLabels, setDietLabels] = useState({
    "High-Fiber": 0,
    "High-Protein": 0,
    "Low-Fat": 0,
    "Low-Sodium": 0,
  });

  // Mapping of variable IDs to food variable names
  const variableIdMap: { [key: number]: string } = {
    1: "Fruits",
    2: "Non-starchy Vegetables",
    3: "Beans & Legumes",
    4: "Nuts & Seeds",
    5: "Refined Carbs",
    6: "Whole Grains",
    7: "Total Processed Meats",
    8: "Unprocessed Red Meats",
    9: "Saturated Fat",
    10: "Monounsaturated Fatty Acids",
    11: "Added Sugars",
  };

  // Deviation calculation function
  const calculateDeviation = (
    countryValue: number,
    globalValue: number
  ): number => {
    if (globalValue === 0) return 0;
    return ((globalValue - countryValue) / countryValue) * 100;
  };

  // Update diet labels based on the deviation
  const updateDietLabels = (processedData: any[]) => {
    const newDietLabels = {
      "High-Fiber": 0,
      "High-Protein": 0,
      "Low-Fat": 0,
      "Low-Sodium": 0,
    };

    processedData.forEach((item: any) => {
      const { variableName, deviation } = item;

      // High-Fiber check
      if (
        [
          "Beans & Legumes",
          "Whole Grains",
          "Fruits",
          "Non-starchy Vegetables",
        ].includes(variableName) &&
        deviation > 50
      ) {
        newDietLabels["High-Fiber"] = 1;
      }

      // High-Protein check
      if (
        [
          "Nuts & Seeds",
          "Beans & Legumes",
          "Unprocessed Red Meats",
          "Total Processed Meats",
        ].includes(variableName) &&
        deviation > 50
      ) {
        newDietLabels["High-Protein"] = 1;
      }

      // Low-Fat check
      if (
        [
          "Nuts & Seeds",
          "Total Processed Meats",
          "Unprocessed Red Meats",
          "Saturated Fat",
          "Monounsaturated Fatty Acids",
        ].includes(variableName) &&
        deviation < -50
      ) {
        newDietLabels["Low-Fat"] = 1;
      }

      // Low-Sodium check
      if (
        ["Total Processed Meats", "Added Sugars"].includes(variableName) &&
        deviation < -50
      ) {
        newDietLabels["Low-Sodium"] = 1;
      }
    });

    setDietLabels(newDietLabels);
  };

  // Fetch country nutrition data and process it
  const fetchNutritionData = async (country_id: string | null) => {
    if (!country_id) {
      setError("Please select a country.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/getNutritionData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country_id: country_id,
            age_id: 7,
          }),
        }
      );
      const data = await response.json();
      const parsedData = JSON.parse(data.body);

      // Process the nutrition data and update diet labels
      const processedData = processNutritionData(parsedData);
      updateDietLabels(processedData);
    } catch (err) {
      setError("Failed to fetch nutrition data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch recipes by combining user-provided health labels and country-specific diet labels
  const fetchRecipes = async (ingredients: string, filters: any) => {
    setError(null);
    setLoading(true);
    console.log(dietLabels);
    try {
      const finalDietLabels = [
        dietLabels["High-Fiber"] ? "High-Fiber" : null,
        dietLabels["High-Protein"] ? "High-Protein" : null,
        dietLabels["Low-Fat"] ? "Low-Fat" : null,
        dietLabels["Low-Sodium"] ? "Low-Sodium" : null,
      ].filter((label) => label !== null);

      console.log(
        JSON.stringify({
          ingredients: ingredients.split(",").map((item) => item.trim()),
          cuisineType: filters.cuisineType || [],
          healthLabels: filters.healthLabels || [],
          dietLabels: finalDietLabels,
        })
      );

      const response = await fetch(
        "https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: ingredients.split(",").map((item) => item.trim()),
            cuisineType: filters.cuisineType || [],
            healthLabels: filters.healthLabels || [],
            dietLabels: finalDietLabels,
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

  // Process the fetched nutrition data for calculating deviations
  const processNutritionData = (data: any[]) => {
    const countryData = data.filter((item) => item.country_ID !== 36);
    const globalData = data.filter((item) => item.country_ID === 36);

    return countryData.map((foodVariableData) => {
      const variableName = variableIdMap[foodVariableData.variable_ID];
      const globalDataItem = globalData.find(
        (globalItem) => globalItem.variable_ID === foodVariableData.variable_ID
      );

      const globalMedian = globalDataItem ? globalDataItem.median : 0;
      const deviation = calculateDeviation(
        foodVariableData.median,
        globalMedian
      );

      return {
        variableName,
        countryMedian: foodVariableData.median,
        globalMedian,
        deviation,
      };
    });
  };

  const handleSearch = async (ingredients: string, filters: any) => {
    const hasIngredients = ingredients.trim() !== "";
    const hasFilters =
      filters &&
      (filters.cuisineType?.length > 0 ||
        filters.healthLabels?.length > 0 ||
        filters.country_id);

    setCountryFilter(filters.country_id);
    setIsInputNotNone(hasIngredients || hasFilters);

    // Reset the error and recipes
    setError(null);
    setRecipes([]);

    // Show loading spinner while fetching
    setLoading(true);

    // Fetch nutrition data and recipes based on user input
    try {
      await fetchNutritionData(filters.country_id);
      await fetchRecipes(ingredients, filters);
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommend-page-container">
      {/* Search by Ingredients Input Bar */}
      <InputBar onSearch={handleSearch} loading={loading} />

      <div className="results-container">
        {/* Show loading spinner or message */}
        {loading && (
          <div style={{ height: "50vh", width: "100%" }}>
            <Loading />
          </div>
        )}

        {/* Display error message */}
        {error && !loading && <p className="error-message">{error}</p>}

        {/* Display search results in Card component */}
        {!loading && recipes.length > 0 && (
          <div className="results-content">
            {countryFilter && (
              <div className="diet-summary-box">
                <h4 style={{ fontWeight: "500" }}>
                  Dietary Adjustments per Australian Standards
                </h4>
                {!Object.values(dietLabels).every((label) => label === 0) && (
                  <p>
                    We've recommended some of the dishes below because your
                    selected country has:
                  </p>
                )}

                {dietLabels["High-Fiber"] === 1 && (
                  <p>
                    <span style={{ color: "#6366f1" }}>Low fiber intake</span>.
                    Consider increasing foods like beans, legumes, and whole
                    grains.
                  </p>
                )}
                {dietLabels["High-Protein"] === 1 && (
                  <p>
                    {" "}
                    <span style={{ color: "#6366f1" }}>Low protein intake</span>
                    . We suggest adding more nuts, seeds, and unprocessed meats.
                  </p>
                )}
                {dietLabels["Low-Fat"] === 1 && (
                  <p>
                    <span style={{ color: "#6366f1" }}>High fat intake</span>.
                    Opt for low-fat foods and reduce saturated fats and
                    processed meats.
                  </p>
                )}
                {dietLabels["Low-Sodium"] === 1 && (
                  <p>
                    <span style={{ color: "#6366f1" }}>High sodium levels</span>
                    . Limiting processed meats and added sugars can help.
                  </p>
                )}
                {/* If none of the labels are 1 */}
                {Object.values(dietLabels).every((label) => label === 0) && (
                  <p>
                    Your country meets the recommended levels for fiber,
                    protein, fat, and sodium. Great job maintaining a balanced
                    diet!
                  </p>
                )}
              </div>
            )}

            <h4
              style={{
                textAlign: "left",
                fontWeight: "500",
                paddingLeft: "20px",
              }}
            >
              Recommended Dishes
            </h4>

            <div className="recommend-page">
              {recipes.map((recipe, index) => {
                const countryDietLabels = Object.keys(dietLabels).filter(
                  (key) => dietLabels[key as keyof typeof dietLabels] === 1
                );

                return (
                  <Card
                    key={index}
                    data={recipe}
                    countryDietLabels={countryDietLabels}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Display no results message when recipes are empty */}
        {!loading && isInputNotNone && recipes.length === 0 && !error && (
          <div className="no-results">
            <h4 style={{ fontWeight: "medium" }}>No results found.</h4>
            <p>
              Please try again with different ingredients or remove some of the
              filters.
            </p>
          </div>
        )}

        {!loading && !isInputNotNone && recipes.length === 0 && !error && (
          <div className="recommendations-container">
            <div className="recommendation-box">
              <span>Get Dish Recommendations</span>
              <p>
                Receive dishes tailored to your country's nutritional needs.
              </p>
            </div>

            <div className="recommendation-box">
              <span>Input Ingredients</span>
              <p>
                Enter your ingredients to get recommendations for healthy
                dishes.
              </p>
            </div>

            <div className="recommendation-box">
              <span>Upload images</span>
              <p>
                Upload an image of an ingredient and we will help identify it
                and include in search.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
