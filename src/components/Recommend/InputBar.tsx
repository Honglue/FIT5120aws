import React, { useState } from 'react';
import './InputBar.css'; // Import CSS for styling

const InputBar: React.FC = () => {
  // States for user input
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<string>('male'); // Default gender value is male
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [closestPercentile, setClosestPercentile] = useState<string | null>(null); // To store API response
  const [error, setError] = useState<string | null>(null); // Error handling

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation: ensure all fields are filled, age is > 0 and < 20, and height/weight are valid
    if (!age || age <= 0 || age >= 20 || !height || !weight) {
      setError('Please fill in all fields, ensure age is greater than 0 and less than 20.');
      return;
    }

    // Convert gender to 'boy' or 'girl'
    const formattedGender = gender === 'male' ? 'boy' : 'girl';

    // Calculate BMI
    const bmi = weight / ((height / 100) * (height / 100));

    try {
      // Send the API request directly to your AWS API Gateway
      const response = await fetch('https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/bmi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bmi,
          age,
          gender: formattedGender,
        }),
      });

      const data = await response.json();

      // Update the state with the API response (closest percentile)
      if (response.ok) {
        setClosestPercentile(data.body); // Assuming response body contains the percentile directly
        setError(null); // Clear any previous errors
      } else {
        setError('Failed to fetch data. Please try again.');
        setClosestPercentile(null);
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      setClosestPercentile(null);
    }
  };

  return (
    <div className="input-bar">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Age (between 1 and 19):</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            min="1"
            max="19"
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Height (in cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label>Weight (in kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {closestPercentile && (
        <div className="result">
          <h3>Your BMI Percentile: {closestPercentile}</h3>
        </div>
      )}
    </div>
  );
};

export default InputBar;
