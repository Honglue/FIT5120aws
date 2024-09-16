import React, { useState, useEffect } from "react";
import "./Recommend.css";
import InputBar from "./InputBar";
import VegetablesCard from "./VegetablesCard";
import FruitsCard from "./FruitsCard";
import GrainsCard from "./GrainsCard";
import LeanMeatsCard from "./LeanMeatsCard";
import MilkProductCard from "./MilkProductCard";

const Recommend: React.FC = () => {
  const [closestPercentile, setClosestPercentile] = useState<string | null>(
    null
  );
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null); // State for user's age
  const [error, setError] = useState<string | null>(null); // State for error handling
  // eslint-disable-next-line
  const [nutritionData, setNutritionData] = useState<any | null>(null); // Fetched nutrition data

  // Fetch the JSON data based on age and gender
  useEffect(() => {
    const fetchNutritionData = async () => {
      if (!age || !gender) return; // Only fetch when age and gender are available

      // Convert gender from "Male"/"Female" to "boys"/"girls"
      const formattedGender = gender === "male" ? "boys" : "girls";

      try {
        const response = await fetch("/us32.json"); // Path to JSON in the public folder
        const data = await response.json();

        // Find the matching entry based on age and formatted gender
        const filtered = data.find(
          // eslint-disable-next-line
          (item: any) =>
            item.gender === formattedGender && item.age === String(age)
        );

        if (filtered) {
          setNutritionData(filtered); // Store the matched data
          setError(null);
        } else {
          setNutritionData(null);
          setError("No data found for the given age and gender.");
        }
      } catch (err) {
        console.error("Error fetching nutrition data:", err);
        setError("Failed to load nutrition data.");
      }
    };

    fetchNutritionData();
  }, [age, gender]); // Re-run fetch whenever age or gender changes

  // Handle the result from InputBar (age, gender, percentile)
  const handleResult = (
    percentile: string | null,
    genderValue: string | null,
    ageValue: number | null,
    errorMessage: string | null
  ) => {
    setClosestPercentile(percentile);
    setGender(genderValue);
    console.log(genderValue);
    setAge(ageValue);
    setError(errorMessage);
  };

  return (
    <div className="recommend-page-container">
      <div className="input-bar-container">
        <InputBar onResult={handleResult} />
      </div>

      {error && <p className="error-message">{error}</p>}

      {closestPercentile && gender && nutritionData && (
        <div className="result">
          {/* <h3>Your BMI Percentile: {closestPercentile}</h3>
          <p>Gender: {gender}</p>
          <p>Age: {age}</p>
          <h4>Recommended Nutrition:</h4>
          <ul>
            <li>Vegetables: {nutritionData.vegetable} serves</li>
            <li>Fruits: {nutritionData.fruit} serves</li>
            <li>Grain: {nutritionData.grain} serves</li>
            <li>Lean Meat: {nutritionData["lean meat"]} serves</li>
            <li>Milk: {nutritionData.milk} serves</li>
          </ul> */}
        </div>
      )}

      {/* Display empty cards with placeholder content when there's no data */}
      <div className="recommend-page">
        <VegetablesCard data={nutritionData || {}} />
        <FruitsCard data={nutritionData || {}} />
        <GrainsCard data={nutritionData || {}} />
        <LeanMeatsCard data={nutritionData || {}} />
        <MilkProductCard data={nutritionData || {}} />
      </div>
    </div>
  );
};

export default Recommend;
