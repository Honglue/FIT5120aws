import React, { useState, useEffect } from "react";
import "./Image.css";
import LoadingBar from "../Loading/loading";
interface ImageRecognitionProps {
  image: File | null;
  onLabelsExtracted: (labels: string[]) => void;
  onRemoveImage: () => void; // Function to remove the image
  label: string; // The identified label to display
}

const ImageRecognition: React.FC<ImageRecognitionProps> = ({
  image,
  onLabelsExtracted,
  onRemoveImage,
  label,
}) => {
  const relevantLabels = [
    "Apple",
    "Banana",
    "Pear",
    "Orange",
    "Carrot",
    "Cucumber",
    "Tomato",
    "Potato",
    "Onion",
    "Broccoli",
    "Lettuce",
    "Strawberry",
    "Grapes",
    "Peach",
    "Pineapple",
    "Noodle",
    "Pasta",
    "Watermelon",
    "Mango",
    "Lemon",
    "Corn",
    "Spinach",
    "Eggplant",
    "Avocado",
    "Cabbage",
    "Pumpkin",
    "Garlic",
    "Ginger",
    "Pepper",
    "Rice",
    "Bread",
    "Cheese",
    "Fish",
    "Meat",
    "Milk",
    "Yogurt",
    "Chicken",
    "Beef",
    "Pork",
    "Shrimp",
    "Crab",
  ];

  const [allLabels, setAllLabels] = useState<any>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Track the loading state

  useEffect(() => {
    analyzeImage();
  }, [image]); // Trigger analysis whenever a new image is uploaded

  const analyzeImage = async () => {
    setError(null);
    setAllLabels(null);
    setLabels([]);
    setLoading(true); // Set loading to true when starting image analysis

    try {
      const base64Image = await convertToBase64(image);
      const imageData = (base64Image as string).replace(
        /^data:image\/[a-z]+;base64,/,
        ""
      );

      const response = await fetch(
        "https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/recognition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: imageData }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze the image.");
      }

      const result = await response.json();
      const allLabel = JSON.parse(result.body);
      setAllLabels(result);

      // Filter relevant labels
      const ingredientLabel = (allLabel.labels || []).filter((label: string) =>
        relevantLabels.includes(label)
      );

      if (ingredientLabel.length === 0) {
        throw new Error("Unable to identify");
      }

      setLabels(ingredientLabel);
      onLabelsExtracted(ingredientLabel); // Pass labels to parent
    } catch (err: any) {
      setError(err.message || "Unable to identify");
    } finally {
      setLoading(false); // Set loading to false after processing is done
    }
  };

  return (
    <div className="image-item-container">
      {/* Always show the remove button */}
      <div className="remove-button" onClick={onRemoveImage}>
        &#10005;
      </div>

      {/* Display the loading component while analyzing the image */}
      {loading && (
        <div className="loading">
          {/* <LoadingBar /> */}
          Uploading...
        </div>
      )}

      {/* Display error message if identification failed */}
      {!loading && error && <div className="error-message">{error}</div>}

      {/* Display the image and labels only after loading is done and no error occurred */}
      {!loading && !error && (
        <>
          <div className="image-preview">
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="uploaded-image"
            />
          </div>
          <div className="image-info">
            <h4 className="image-label">{label}</h4>
            <p className="image-filename">{image.name}</p>
          </div>
        </>
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
    reader.onerror = (error) => reject(error);
  });
};

export default ImageRecognition;
