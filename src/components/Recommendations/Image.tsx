import React, { useState } from 'react';

const ImageRecognition: React.FC = () => {
  const relevantLabels = ["Apple", "Banana", "Pear", "Orange", "Carrot", "Cucumber", "Tomato", "Potato", 
    "Onion", "Broccoli", "Lettuce", "Strawberry", "Grapes", "Peach", "Pineapple", "Noodle","Pasta",
    "Watermelon", "Mango", "Lemon", "Corn", "Spinach", "Eggplant", "Avocado", 
    "Cabbage", "Pumpkin", "Garlic", "Ginger", "Pepper", "Rice", "Bread", "Cheese", 
    "Fish", "Meat", "Milk", "Yogurt", "Chicken", "Beef", "Pork", "Shrimp", "Crab"];

  const [image, setImage] = useState<File | null>(null);
  const [allLabels, setAllLabels] = useState<any>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      setError('Please upload an image.');
      return;
    }
  
    setError(null);

    setAllLabels(null);

    setLabels([]);
  
    try {
      const base64Image = await convertToBase64(image);
      const imageData = (base64Image as string).replace(/^data:image\/[a-z]+;base64,/, '');
  
      const response = await fetch(
        'https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/recognition',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: imageData }),
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to analyze the image.');
      }
  
      const result = await response.json();
      const allLabel = JSON.parse(result.body);
      setAllLabels(result);
      console.log(allLabel);
      const ingredientLabel = (allLabel.labels || []).filter((label: string) => relevantLabels.includes(label));
      setLabels(ingredientLabel);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="image-recognition">
      <h2>Upload an Image for Analysis</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button onClick={analyzeImage}>Analyze Image</button>

      {/* Display error message */}
      {error && <p className="error">{error}</p>}

      {/* Display image */}
      {image && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}

      {/* Display labels */}
      {labels.length > 0 && (
  <div>
    <pre>origin labels:{JSON.stringify(allLabels.body)}</pre>
    <h3>Detected Labels:</h3>
    <ul>
      {labels.map((label, index) => (
        <li key={index}>{label}</li>
      ))}
    </ul>
  </div>
)}
    </div>
  );
};

// Helper function to convert image to Base64
const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export default ImageRecognition;
