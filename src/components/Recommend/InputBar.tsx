import React, { useState } from "react";
import "./InputBar.css";

interface InputBarProps {
  onResult: (
    percentile: string | null,
    genderValue: string | null,
    ageValue: number | null,
    errorMessage: string | null
  ) => void;
  loading: boolean; // Pass loading state
  setLoading: (loading: boolean) => void; // Setter for loading state
}

const InputBar: React.FC<InputBarProps> = ({
  onResult,
  loading,
  setLoading,
}) => {
  const [age, setAge] = useState<number | "">(""); // State for age
  const [gender, setGender] = useState<string>("Select"); // Default gender value is male
  const [height, setHeight] = useState<number | "">(""); // State for height
  const [weight, setWeight] = useState<number | "">(""); // State for weight
  const [closestPercentile, setClosestPercentile] = useState<string | null>(
    null
  ); // To store API response
  const [bmi, setBmi] = useState<number | null>(null); // To store calculated BMI
  const [bmiPercentage, setBmiPercentage] = useState<string | null>(null); // To store BMI percentile as a percentage
  const [error, setError] = useState<string | null>(null); // Error handling

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!age || age <= 0 || age >= 19) {
      setError("Please input age between 1 and 18.");
      // onResult(
      //   null,
      //   null,
      //   null,
      //   "Please fill in all fields, and ensure age is between 1 and 19."
      // );
      return;
    }

    if (!height || !weight) {
      setError("Please fill in all fields");
      // onResult(
      //   null,
      //   null,
      //   null,
      //   "Please fill in all fields, and ensure age is between 1 and 19."
      // );
      return;
    }

    if (weight > 200) {
      setError("Please enter a weight less than 200 kg.");
      // onResult(null, null, null, "Weight must be less than 200 kg.");
      return;
    }

    if (height > 200) {
      setError("Please enter a height less than 200 cm.");
      // onResult(null, null, null, "Height must be less than 200 cm.");
      return;
    }

    setLoading(true); // Start loading when the form is submitted

    const formattedGender = gender === "male" ? "boy" : "girl";
    const calculatedBmi = weight / ((height / 100) * (height / 100));
    setBmi(calculatedBmi); // Store the calculated BMI in the state

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
      console.log(data);
      if (response.ok) {
        setClosestPercentile(data.body);
        const percentileValue = data.body.replace("P", "") + "%";
        setBmiPercentage(percentileValue); // Store the percentage value
        setError(null);
        onResult(data.body, gender, age, null); // Pass the data to the parent component
      } else {
        setError("Failed to fetch data. Please try again.");
        onResult(null, null, null, "Failed to fetch data. Please try again.");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      onResult(null, null, null, "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false); // Stop loading after the API response is received
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="recommend-input-bar">
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            placeholder="Enter age 1-18"
            // min="1"
            // max="18"
            // required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label style={{ textAlign: "left", fontWeight: "medium" }}>
            Weight
          </label>
          <div className="input-with-label">
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              placeholder="Enter weight in kg"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="height">Height</label>
          <div className="input-with-label">
            <input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              placeholder="Enter height in cm"
              required
            />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          Calculate
        </button>
      </form>

      {error && (
        <p
          className="error-message"
          style={{ color: "red", marginTop: "10px" }}
        >
          {error}
        </p>
      )}

      {closestPercentile && bmi && bmiPercentage && (
        <div
          className="result"
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "15px",
            marginTop: "20px",
            textAlign: "center",
            maxWidth: "60vw",
            margin: "20px auto",
          }}
        >
          <h3
            style={{
              textAlign: "left",
              fontSize: "18px",
              fontWeight: "400",
              marginBottom: "8px",
            }}
          >
            Your BMI:{" "}
            <span
              style={{ fontWeight: "bold", fontSize: "24px", color: "#6366f1" }}
            >
              {bmi.toFixed(2)}
            </span>
          </h3>

          <h3
            style={{ fontSize: "18px", fontWeight: "400", textAlign: "left" }}
          >
            Your BMI is larger than{" "}
            <span
              style={{ fontWeight: "bold", fontSize: "24px", color: "#6366f1" }}
            >
              {bmiPercentage}
            </span>{" "}
            of people in the same age and gender.
          </h3>
        </div>
      )}
    </div>
  );
};

export default InputBar;
