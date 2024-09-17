import React, { useState } from "react";
import "./Recommend.css";
import InputBar from "./InputBar";
import VegetablesCard from "./VegetablesCard";
import FruitsCard from "./FruitsCard";
import GrainsCard from "./GrainsCard";
import LeanMeatsCard from "./LeanMeatsCard";
import MilkProductCard from "./MilkProductCard";
import Loading from "../Loading/loading";

const Recommend: React.FC = () => {
  const [closestPercentile, setClosestPercentile] = useState<string | null>(
    null
  );
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null); // State for user's age
  const [error, setError] = useState<string | null>(null); // State for error handling
  const [nutritionData, setNutritionData] = useState<any | null>(null); // Fetched nutrition data
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Fetch the JSON data based on age and gender
  const fetchNutritionData = async (
    age: number | null,
    gender: string | null
  ) => {
    if (!age || !gender) return; // Only fetch when age and gender are available

    setLoading(true);

    // Convert gender from "Male"/"Female" to "boys"/"girls"
    const formattedGender = gender === "male" ? "boys" : "girls";

    try {
      const response = await fetch("/us32.json"); // Path to JSON in the public folder
      const data = await response.json();

      // Find the matching entry based on age and formatted gender
      const filtered = data.find(
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
    } finally {
      setLoading(false);
    }
  };

  // Handle the result from InputBar (age, gender, percentile)
  const handleResult = (
    percentile: string | null,
    genderValue: string | null,
    ageValue: number | null,
    errorMessage: string | null
  ) => {
    setClosestPercentile(percentile);
    setGender(genderValue);
    setAge(ageValue);
    setError(errorMessage);

    // Fetch the updated nutrition data based on the new age and gender values
    fetchNutritionData(ageValue, genderValue);
  };

  return (
    <div className="recommend-page-container">
      <InputBar onResult={handleResult} />
      {/* Show loading spinner or message */}
      {loading && <Loading />}
      <h4>
        The following are your recommend dietary consumption for each day.
      </h4>
      {error && !loading && <p className="error-message">{error}</p>}
      <div className="recommend-page">
        {nutritionData ? (
          <>
            <VegetablesCard data={nutritionData || {}} />
            <FruitsCard data={nutritionData || {}} />
            <GrainsCard data={nutritionData || {}} />
            <LeanMeatsCard data={nutritionData || {}} />
            <MilkProductCard data={nutritionData || {}} />
          </>
        ) : (
          <div>Type in the filter to get started.</div>
        )}
      </div>{" "}
    </div>
  );
};

export default Recommend;
