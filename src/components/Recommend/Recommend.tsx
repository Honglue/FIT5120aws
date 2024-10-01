import React, { useState, useEffect } from "react";
import "./Recommend.css";
import InputBar from "./InputBar";
import VegetablesCard from "./VegetablesCard";
import FruitsCard from "./FruitsCard";
import GrainsCard from "./GrainsCard";
import LeanMeatsCard from "./LeanMeatsCard";
import MilkProductCard from "./MilkProductCard";
import Loading from "../Loading/loading";

const Recommend: React.FC = () => {
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null); // State for user's age
  const [error, setError] = useState<string | null>(null); // State for error handling
  const [nutritionData, setNutritionData] = useState<any | null>(null); // Fetched nutrition data
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Fetch the JSON data based on age and gender
  useEffect(() => {
    const fetchNutritionData = async () => {
      if (!age || !gender) return; // Only fetch when age and gender are available

      setLoading(true);
      console.log(loading);

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

    fetchNutritionData();
  }, [age, gender]); // Re-run fetch whenever age or gender changes

  // Handle the result from InputBar (age, gender, percentile)
  const handleResult = (
    percentile: string | null,
    genderValue: string | null,
    ageValue: number | null,
    errorMessage: string | null
  ) => {
    console.log(percentile);
    setGender(genderValue);
    setAge(ageValue);
    setError(errorMessage);
  };

  return (
    <div className="recommend-page-container">
      <InputBar
        onResult={handleResult}
        loading={loading}
        setLoading={setLoading}
      />
      <div className="recommend-content">
        {!nutritionData && (
          <p>
            Check how your children is doing compared to other children.
            <br />
            Get started by calculating your child's BMI.
          </p>
        )}
        {/* Show loading spinner or message */}
        {loading && <Loading />}

        {error && !loading && <p className="error-message">{error}</p>}

        {!loading && nutritionData && (
          <div style={{ padding: "40px" }}>
            <h4 style={{ textAlign: "left", fontWeight: "bold" }}>
              Daily Recommended Dietary Intake According to Australian Standards
            </h4>

            <div className="recommend-page">
              <VegetablesCard data={nutritionData || {}} />
              <FruitsCard data={nutritionData || {}} />
              <GrainsCard data={nutritionData || {}} />
              <LeanMeatsCard data={nutritionData || {}} />
              <MilkProductCard data={nutritionData || {}} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommend;
