import React, { useState } from "react";
import "./InputBar.css";

interface InputBarProps {
  onResult: (
    genderValue: string | null,
    ageValue: number | null,
    errorMessage: string | null
  ) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const InputBar: React.FC<InputBarProps> = ({
  onResult,
  loading,
  setLoading,
}) => {
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<string>("Select");
  const [height, setHeight] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [closestPercentile, setClosestPercentile] = useState<string | null>(
    null
  );
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiPercentage, setBmiPercentage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bmiC, setBmiC] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!age || age <= 0 || age >= 19) {
      setError("Please input age between 1 and 18.");
      return;
    }

    if (!height || !weight) {
      setError("Please fill in all fields");
      return;
    }

    if (weight > 200) {
      setError("Please enter a weight less than 200 kg.");
      return;
    }

    if (height > 200) {
      setError("Please enter a height less than 200 cm.");
      return;
    }

    setLoading(true);
    const formattedGender = gender === "male" ? "boy" : "girl";
    const calculatedBmi = weight / ((height / 100) * (height / 100));
    setBmi(calculatedBmi);

    try {
      const response = await fetch(
        "https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/bmi",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bmi: calculatedBmi,
            age,
            gender: formattedGender,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setClosestPercentile(data.body);
        const percentileValue = data.body.replace("P", "") + "%";
        setBmiC(parseFloat(data.body.replace("P", "")));
        setBmiPercentage(percentileValue);
        setError(null);
        onResult(gender, age, null);
      } else {
        setError("Failed to fetch data. Please try again.");
        onResult(null, null, "Failed to fetch data. Please try again.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      onResult(null, null, "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="recommend-input-bar">
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="text"
            value={age}
            onChange={(e) => {
              const value = e.target.value.replace(/^0+/, "");
              if (/^\d*$/.test(value)) {
                setAge(value === "" ? "" : Number(value));
              }
            }}
            placeholder="Enter 1-18"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <input
            id="weight"
            type="text"
            value={weight}
            onChange={(e) => {
              const value = e.target.value.replace(/^0+/, "");
              if (/^\d*$/.test(value)) {
                setWeight(value === "" ? "" : Number(value));
              }
            }}
            placeholder="Enter in kg"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="height">Height</label>
          <input
            id="height"
            type="text"
            value={height}
            onChange={(e) => {
              const value = e.target.value.replace(/^0+/, "");
              if (/^\d*$/.test(value)) {
                setHeight(value === "" ? "" : Number(value));
              }
            }}
            placeholder="Enter in cm"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="calculate-button">
          {loading ? "Calculating" : "Calculate"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {!loading && closestPercentile && bmi && bmiPercentage && bmiC && (
        <div className="result">
          <h4>Results</h4>
          <p>
            Your child's BMI: <span>{bmi.toFixed(2)}</span>
          </p>

          <p>
            {gender === "male" && (
              <>
                {bmiC < 1.2 &&
                  "Your child's BMI suggests they might be underweight. Consider consulting with a healthcare professional for guidance on achieving a balanced diet."}
                {bmiC >= 1.2 &&
                  bmiC < 29 &&
                  "Great news! Your child's BMI is within a healthy range. Keep up the good habits!"}
                {bmiC >= 29 &&
                  bmiC < 72 &&
                  "Your child's BMI indicates they might be slightly above the ideal range. A focus on balanced nutrition and regular activity could help."}
                {bmiC >= 72 &&
                  "Your child's BMI suggests they might be in the higher range. It might be beneficial to seek advice from a healthcare provider for personalised support."}
              </>
            )}

            {gender === "female" && (
              <>
                {bmiC < 2.1 &&
                  "Your child's BMI suggests they might be underweight. It could be a good idea to speak with a healthcare professional for tips on healthy nutrition."}
                {bmiC >= 2.1 &&
                  bmiC < 43 &&
                  "Great news! Your child's BMI is in a healthy range. Keep encouraging those healthy habits!"}
                {bmiC >= 43 &&
                  bmiC < 73 &&
                  "Your child's BMI is slightly higher than the ideal range. A balanced diet and regular exercise can make a difference."}
                {bmiC >= 73 &&
                  "Your child's BMI suggests they might be in the higher range. Consulting a healthcare professional for tailored advice could be very helpful."}
              </>
            )}
          </p>

          <p>
            Compared to other children of the same age and gender, your child's
            BMI is higher than <span>{bmiPercentage}</span> of their peers.
          </p>
        </div>
      )}
    </div>
  );
};

export default InputBar;
