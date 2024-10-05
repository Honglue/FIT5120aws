import React, { useState } from "react";
import "./Recommendations.css";
import InputBar from "./InputBar";
import Card from "./Card";
import Loading from "../Loading/loading";

const Recommendations: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);

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
      setFilteredData(parsedData);

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

  // Handle the result from InputBar (ingredients and filters)
  const handleSearch = async (ingredients: string, filters: any) => {
    await fetchNutritionData(filters.country_id); // Fetch nutrition data using the country_id from filters
    await fetchRecipes(ingredients, filters); // Fetch recipes after fetching and updating diet labels
  };

  return (
    <div className="recommend-page-container">
      {/* Search by Ingredients Input Bar */}
      <InputBar onSearch={handleSearch} loading={loading} />

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

      {/* Display fetched nutrition data */}
      <div className="nutrition-data-container">
        {!loading && filteredData.length > 0 && (
          <div>
            <h4>Nutrition Data for Selected Country</h4>
            <ul>
              {processNutritionData(filteredData).map((item: any, index) => (
                <li key={index}>
                  {item.variableName}: {item.countryMedian} (Country),{" "}
                  {item.globalMedian} (Australia), Deviation:{" "}
                  {item.deviation.toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Display the updated diet labels */}
      <div className="diet-labels-container">
        <h4>Diet Labels</h4>
        <p>High-Fiber: {dietLabels["High-Fiber"]}</p>
        <p>High-Protein: {dietLabels["High-Protein"]}</p>
        <p>Low-Fat: {dietLabels["Low-Fat"]}</p>
        <p>Low-Sodium: {dietLabels["Low-Sodium"]}</p>
      </div>
    </div>
  );
};

export default Recommendations;
