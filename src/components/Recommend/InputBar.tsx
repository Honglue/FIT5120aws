import React, { useState } from 'react';
import './InputBar.css';

interface InputBarProps {
  onResult: (percentile: string | null, genderValue: string | null, ageValue: number | null, errorMessage: string | null) => void;
}

const InputBar: React.FC<InputBarProps> = ({ onResult }) => {
  const [age, setAge] = useState<number | ''>(''); // State for age
  const [gender, setGender] = useState<string>('male'); // Default gender value is male
  const [height, setHeight] = useState<number | ''>(''); // State for height
  const [weight, setWeight] = useState<number | ''>(''); // State for weight
  const [closestPercentile, setClosestPercentile] = useState<string | null>(null); // To store API response
  const [bmi, setBmi] = useState<number | null>(null); // To store calculated BMI
  const [error, setError] = useState<string | null>(null); // Error handling

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!age || age <= 0 || age >= 20 || !height || !weight) {
      setError('Please fill in all fields, and ensure age is between 1 and 19.');
      onResult(null, null, null, 'Please fill in all fields, and ensure age is between 1 and 19.');
      return;
    }

    const formattedGender = gender === 'male' ? 'boy' : 'girl';
    const calculatedBmi = weight / ((height / 100) * (height / 100));
    setBmi(calculatedBmi); // Store the calculated BMI in the state

    try {
      const response = await fetch('https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/bmi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bmi: calculatedBmi, age, gender: formattedGender }),
      });

      const data = await response.json();
      if (response.ok) {
        setClosestPercentile(data.body);
        setError(null);
        onResult(data.body, gender, age, null); // Pass the data to the parent component
      } else {
        setError('Failed to fetch data. Please try again.');
        onResult(null, null, null, 'Failed to fetch data. Please try again.');
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      onResult(null, null, null, 'Failed to fetch data. Please try again.');
    }
  };

  return (
    <div className="input-bar">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Age (between 1 and 19):</label>
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} min="1" max="19" required />
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
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} required />
        </div>
        <div className="form-group">
          <label>Weight (in kg):</label>
          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} required />
        </div>
        <button type="submit">Submit</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {closestPercentile && bmi && (
        <div className="result">
          <h3>Your BMI: {bmi.toFixed(2)}</h3>
          <h3>BMI Percentile: {closestPercentile}</h3>
        </div>
      )}
    </div>
  );
};

export default InputBar;
