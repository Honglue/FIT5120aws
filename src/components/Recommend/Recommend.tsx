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
  const [age, setAge] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nutritionData, setNutritionData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNutritionData = async () => {
      if (!age || !gender) return;

      setLoading(true);
      const formattedGender = gender === "male" ? "boys" : "girls";

      try {
        const response = await fetch("/us32.json");
        const data = await response.json();

        const filtered = data.find(
          (item: any) =>
            item.gender === formattedGender && item.age === String(age)
        );

        if (filtered) {
          setNutritionData(filtered);
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
  }, [age, gender]);

  const handleResult = (
    percentile: string | null,
    genderValue: string | null,
    ageValue: number | null,
    errorMessage: string | null
  ) => {
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
        {!loading && !nutritionData && (
          <div className="recommend-container">
            <div className="recommendation-box recommend-box">
              <span>Assess Your Child's Health</span>
              <p>See how your child's health compares to their peers.</p>
            </div>
            <div className="recommendation-box recommend-box">
              <span>Calculate BMI</span>
              <p>Calculate your child's BMI to track their growth.</p>
            </div>
            <div className="recommendation-box recommend-box">
              <span>Daily Nutrition Guidance</span>
              <p>Get personalised nutrition tips for your child.</p>
            </div>
          </div>
        )}

        {loading && <Loading />}

        {error && !loading && !nutritionData && (
          <p className="error-message">{error}</p>
        )}

        {!loading && nutritionData && (
          <div style={{ padding: "20px" }}>
            <h4 style={{ textAlign: "left", fontWeight: "500" }}>
              Recommended Daily Intake per Australian Standards
            </h4>
            <div className="recommend-page">
              <VegetablesCard data={nutritionData} />
              <FruitsCard data={nutritionData} />
              <GrainsCard data={nutritionData} />
              <LeanMeatsCard data={nutritionData} />
              <MilkProductCard data={nutritionData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommend;
