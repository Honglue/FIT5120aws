const relevantLabels = [
  // Fruits
  "Apple",
  "Banana",
  "Pear",
  "Orange",
  "Grapes",
  "Mango",
  "Pineapple",
  "Strawberry",
  "Blueberry",
  "Raspberry",
  "Blackberry",
  "Peach",
  "Plum",
  "Cherry",
  "Watermelon",
  "Cantaloupe",
  "Kiwi",
  "Papaya",
  "Lemon",
  "Lime",
  "Avocado",

  // Vegetables
  "Tomato",
  "Cucumber",
  "Lettuce",
  "Carrot",
  "Spinach",
  "Broccoli",
  "Cauliflower",
  "Potato",
  "Sweet Potato",
  "Bell Pepper",
  "Zucchini",
  "Eggplant",
  "Mushroom",
  "Garlic",
  "Onion",
  "Chili Pepper",
  "Cabbage",
  "Kale",
  "Radish",
  "Asparagus",
  "Celery",
  "Peas",
  "Corn",
  "Beetroot",
  "Brussels Sprouts",

  // Proteins (Meat, Fish, Plant-based)
  "Chicken",
  "Beef",
  "Pork",
  "Fish",
  "Salmon",
  "Tuna",
  "Shrimp",
  "Turkey",
  "Lamb",
  "Duck",
  "Tofu",
  "Egg",
  "Tempeh",
  "Lentils",
  "Chickpeas",
  "Black Beans",
  "Kidney Beans",
  "Quinoa",
  "Soybeans",
  "Peanuts",

  // Dairy
  "Milk",
  "Cheese",
  "Yogurt",
  "Butter",
  "Cream",
  "Cottage Cheese",
  "Feta",
  "Mozzarella",
  "Goat Cheese",

  // Grains, Starches, Noodles, and Pasta
  "Rice",
  "Brown Rice",
  "White Rice",
  "Barley",
  "Oats",
  "Quinoa",
  "Couscous",
  "Wheat",
  "Pasta",
  "Bread",
  "Tortilla",
  "Corn",
  "Popcorn",
  "Millet",
  "Buckwheat",
  "Spaghetti",
  "Noodles",
  "Ramen",
  "Udon",
  "Soba",
  "Rice Noodles",
  "Lasagna",
  "Macaroni",
  "Fettuccine",
  "Vermicelli",
  "Angel Hair",
  "Penne",

  // Nuts and Seeds
  "Almonds",
  "Cashews",
  "Peanuts",
  "Walnuts",
  "Pecans",
  "Pistachios",
  "Sunflower Seeds",
  "Chia Seeds",
  "Flax Seeds",
  "Sesame Seeds",
  "Pumpkin Seeds",
  "Hazelnuts",

  // Herbs and Spices
  "Basil",
  "Cilantro",
  "Parsley",
  "Mint",
  "Oregano",
  "Thyme",
  "Rosemary",
  "Dill",
  "Sage",
  "Cumin",
  "Turmeric",
  "Ginger",
  "Cinnamon",
  "Paprika",
  "Pepper",
  "Cardamom",
  "Clove",
  "Saffron",
  "Vanilla",

  // Oils and Fats
  "Olive Oil",
  "Coconut Oil",
  "Butter",
  "Canola Oil",
  "Sunflower Oil",
  "Vegetable Oil",
  "Avocado Oil",

  // Sweeteners
  "Honey",
  "Sugar",
  "Maple Syrup",
  "Agave Syrup",
  "Brown Sugar",

  // Beverages
  "Coffee",
  "Tea",
  "Juice",
  "Milk",
  "Smoothie",
  "Soda",
  "Wine",
  "Beer",

  // Other Common Ingredients
  "Salt",
  "Pepper",
  "Vinegar",
  "Soy Sauce",
  "Mustard",
  "Ketchup",
  "Mayonnaise",
  "Hot Sauce",
  "BBQ Sauce",
  "Sour Cream",
  "Whipped Cream",
  "Coconut Milk",
  "Tomato Sauce",
  "Chocolate",
  "Peanut Butter",
  "Jelly",
];

import React, { useState, useEffect } from "react";
import "./Image.css";

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
  // const [allLabels, setAllLabels] = useState<any>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Track the loading state

  useEffect(() => {
    if (image) {
      analyzeImage();
    }
  }, [image]); // Trigger analysis whenever a new image is uploaded

  const analyzeImage = async () => {
    setError(null);
    // setAllLabels(null);
    setLabels([]);
    setLoading(true); // Set loading to true when starting image analysis

    try {
      if (!image) throw new Error("Image not found");
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
      // setAllLabels(result);
      console.log(result);

      // Filter relevant labels
      const ingredientLabel = (allLabel.labels || []).filter((label: string) =>
        relevantLabels.includes(label)
      );

      if (ingredientLabel.length === 0) {
        throw new Error("Oops! We couldn't identify that. \nPlease try again.");
      }

      setLabels(ingredientLabel);
      console.log(labels);
      onLabelsExtracted(ingredientLabel); // Pass labels to parent
    } catch (err: any) {
      setError(
        err.message || "Oops! We couldn't identify that. \nPlease try again."
      );
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
      {!loading && error && (
        <div
          className="error-message"
          style={{ fontSize: "12px", paddingTop: "4px", width: "80%" }}
        >
          {error}
        </div>
      )}

      {/* Display the image and labels only after loading is done and no error occurred */}
      {!loading && !error && (
        <>
          <div className="image-preview">
            <img
              src={image ? URL.createObjectURL(image) : ""}
              alt="Uploaded"
              className="uploaded-image"
            />
          </div>
          <div className="image-info">
            <h4 className="image-label">{label}</h4>
            <p className="image-filename">{image?.name}</p>
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
