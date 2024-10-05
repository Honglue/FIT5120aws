import React, { useState } from "react";
import "./InputBar.css";
import FilterDropdown from "./FilterDropdown";
import { FaUpload } from "react-icons/fa";
import ImageRecognition from "./Image";
import iso31661 from "iso-3166-1";

interface InputBarProps {
  onSearch: (ingredients: string, filters: any) => void;
  loading: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSearch, loading }) => {
  const [input, setInput] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [labelsForImages, setLabelsForImages] = useState<string[][]>([]); // Store labels for each image

  const [selectedHealthLabels, setSelectedHealthLabels] = useState<string[]>(
    []
  );
  const [selectedCuisineType, setSelectedCuisineType] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Keep track of the open dropdown

  const healthLabels = [
    "Pork-Free",
    "Alcohol-Free",
    "Vegan",
    "Gluten-Free",
    "Low-Sugar",
  ];

  const cuisineTypes = [
    "American",
    "Asian",
    "British",
    "Caribbean",
    "Central Europe",
    "Chinese",
    "Eastern Europe",
    "French",
    "Greek",
    "Indian",
    "Italian",
    "Japanese",
    "Korean",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "South American",
    "South East Asian",
    "World",
  ];

  const handleCountrySelect = (selectedCountry: string | null) => {
    const numericCode = selectedCountry
      ? iso31661.whereAlpha2(selectedCountry)?.numeric
      : null;
    setSelectedCountry(numericCode ? String(numericCode) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedInput = `${input} ${labelsForImages
      .flat()
      .join(", ")}`.trim(); // Combine all labels for all images
    const lowerCaseHealthLabels = selectedHealthLabels.map((label) =>
      label.toLowerCase()
    );
    const lowerCaseCuisineType = selectedCuisineType.map((cuisine) =>
      cuisine.toLowerCase()
    );

    onSearch(combinedInput, {
      healthLabels: lowerCaseHealthLabels,
      cuisineType: lowerCaseCuisineType,
      country_id: selectedCountry,
    });
  };

  const handleLabelsFromImage = (labels: string[], index: number) => {
    setLabelsForImages((prevLabels) => {
      const newLabels = [...prevLabels];
      newLabels[index] = labels; // Set labels for the current image
      return newLabels;
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImages = Array.from(event.target.files);

      // Only allow if total number of images is less than or equal to 3
      if (images.length + newImages.length > 3) {
        alert("You can only upload up to 3 images.");
        return;
      }

      setImages((prevImages) => [...prevImages, ...newImages]);
      setLabelsForImages((prevLabels) => [
        ...prevLabels,
        ...newImages.map(() => []),
      ]); // Add empty labels for new images
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setLabelsForImages((prevLabels) =>
      prevLabels.filter((_, i) => i !== index)
    ); // Remove corresponding labels
  };

  return (
    <div className="input-bar-container">
      <div className="filters">
        <FilterDropdown
          label="Dietary"
          options={healthLabels}
          selectedOptions={selectedHealthLabels}
          setSelectedOptions={setSelectedHealthLabels}
          isOpen={openDropdown === "health"} // Open if the dropdown is the health one
          onOpen={() => setOpenDropdown("health")} // Set open dropdown to health
          onClose={() => setOpenDropdown(null)} // Close dropdown
        />

        <FilterDropdown
          label="Cuisine"
          options={cuisineTypes}
          selectedOptions={selectedCuisineType}
          setSelectedOptions={setSelectedCuisineType}
          isOpen={openDropdown === "cuisine"} // Open if the dropdown is the cuisine one
          onOpen={() => setOpenDropdown("cuisine")} // Set open dropdown to cuisine
          onClose={() => setOpenDropdown(null)} // Close dropdown
        />

        <FilterDropdown
          label="Country"
          options={[]}
          selectedOptions={[]}
          setSelectedOptions={() => {}}
          isMultiSelect={false}
          isCountrySelect={true}
          onCountrySelect={handleCountrySelect}
          isOpen={openDropdown === "country"} // Open if the dropdown is the country one
          onOpen={() => setOpenDropdown("country")} // Set open dropdown to country
          onClose={() => setOpenDropdown(null)} // Close dropdown
        />
      </div>

      <form onSubmit={handleSubmit} className="input-bar-form">
        <div className="icon-buttons">
          <button
            type="button"
            className="icon-button"
            onClick={() => document.getElementById("file-input")?.click()}
            disabled={images.length >= 3}
          >
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleFileChange}
              multiple // Allow multiple images
              style={{ display: "none" }}
              disabled={images.length >= 3}
            />
            <FaUpload size={16} />
          </button>
        </div>

        <input
          type="text"
          className="input-bar"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type ingredients here"
        />

        <button type="submit" className="search-button" disabled={loading}>
          Search
        </button>
      </form>

      <div className="images-container">
        {images.map((image, index) => (
          <ImageRecognition
            key={index}
            image={image}
            onLabelsExtracted={(labels) => handleLabelsFromImage(labels, index)} // Pass the index to handle labels for the correct image
            onRemoveImage={() => handleRemoveImage(index)}
            label={labelsForImages[index]?.join(", ") || ""} // Display the labels for each image
          />
        ))}
      </div>

      {images.length <= 0 && (
        <p style={{ width: "580px", textAlign: "left" }}>
          You can only upload only up to 3 images
        </p>
      )}
    </div>
  );
};

export default InputBar;
