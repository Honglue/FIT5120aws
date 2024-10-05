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
  const [input, setInput] = useState<string>(""); // Text input from user
  const [image, setImage] = useState<File | null>(null); // Selected image
  const [highlightedLabels, setHighlightedLabels] = useState<string[]>([]); // Highlighted labels from the image recognition
  const [identifiedLabels, setIdentifiedLabels] = useState<string[]>([]); // Identified labels from image recognition

  const [selectedHealthLabels, setSelectedHealthLabels] = useState<string[]>(
    []
  );
  const [selectedCuisineType, setSelectedCuisineType] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null); // State for selected country

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

  // Handle country selection and convert to numeric code
  const handleCountrySelect = (selectedCountry: string | null) => {
    const numericCode = selectedCountry
      ? iso31661.whereAlpha2(selectedCountry)?.numeric
      : null;
    setSelectedCountry(numericCode ? String(numericCode) : null);
    console.log(selectedCountry);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Concatenate identified labels with input
    const combinedInput = `${input} ${identifiedLabels.join(", ")}`.trim();

    const lowerCaseHealthLabels = selectedHealthLabels.map((label) =>
      label.toLowerCase()
    );
    const lowerCaseCuisineType = selectedCuisineType.map((cuisine) =>
      cuisine.toLowerCase()
    );

    onSearch(combinedInput, {
      healthLabels: lowerCaseHealthLabels,
      cuisineType: lowerCaseCuisineType,
      country_id: selectedCountry, // Pass selected country to onSearch
    });
    console.log(selectedCountry);
  };

  // Handle the identified labels from image recognition and store them separately
  const handleLabelsFromImage = (labels: string[]) => {
    setIdentifiedLabels(labels); // Store the identified labels separately
    setHighlightedLabels(labels); // If you want to show the labels in some highlighted format
  };

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log("File selected:", event.target.files[0]); // Debugging line
      setImage(event.target.files[0]);
    }
  };

  // Remove image and reset the identified labels
  const handleRemoveImage = () => {
    setImage(null);
    setIdentifiedLabels([]);
  };

  return (
    <div className="input-bar-container">
      <div className="filters">
        {/* Health Labels Filter */}
        <FilterDropdown
          label="Dietary"
          options={healthLabels}
          selectedOptions={selectedHealthLabels}
          setSelectedOptions={setSelectedHealthLabels}
        />

        {/* Cuisine Type Filter */}
        <FilterDropdown
          label="Cuisine"
          options={cuisineTypes}
          selectedOptions={selectedCuisineType}
          setSelectedOptions={setSelectedCuisineType}
        />

        {/* Country Filter Dropdown */}
        <FilterDropdown
          label="Country"
          options={[]} // Pass empty array since country select logic is handled internally
          selectedOptions={[]} // No external options handling needed for country
          setSelectedOptions={() => {}} // No need for external state management
          isMultiSelect={false}
          isCountrySelect={true} // Pass the isCountrySelect prop to true
          onCountrySelect={handleCountrySelect} // Pass the handleCountrySelect method
        />
      </div>

      <form onSubmit={handleSubmit} className="input-bar-form">
        <div className="icon-buttons">
          <button
            type="button"
            className="icon-button"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <FaUpload size={16} />
          </button>
        </div>

        {/* User text input */}
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
        {/* Image Upload and Recognition Component */}
        {image && (
          <ImageRecognition
            image={image}
            onLabelsExtracted={handleLabelsFromImage}
            onRemoveImage={handleRemoveImage}
            label={identifiedLabels[0] || ""} // Display first identified label
          />
        )}
      </div>
    </div>
  );
};

export default InputBar;
