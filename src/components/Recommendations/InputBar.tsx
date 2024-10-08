import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./InputBar.css";
import FilterDropdown from "./FilterDropdown";
import { FaUpload } from "react-icons/fa";
import ImageRecognition from "./Image";
import iso31661 from "iso-3166-1";
import CountryFilter from "./CountryFilter";

interface InputBarProps {
  onSearch: (ingredients: string, filters: any) => void;
  loading: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSearch, loading }) => {
  const location = useLocation();
  const [input, setInput] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [labelsForImages, setLabelsForImages] = useState<string[][]>([]);
  const [selectedHealthLabels, setSelectedHealthLabels] = useState<string[]>(
    []
  );
  const [selectedCuisineType, setSelectedCuisineType] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(location.state?.selectedCountry || null);
  console.log('p', selectedCountry);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
    const lowerCaseInput = input.toLowerCase().trim();
    const lowerCaseLabelsForImages = labelsForImages
      .flat()
      .map((label) => label.toLowerCase())
      .join(", ");
    const combinedInput = [lowerCaseInput, lowerCaseLabelsForImages]
      .filter(Boolean)
      .join(", ");
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
      newLabels[index] = labels;
      return newLabels;
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImages = Array.from(event.target.files);
      if (images.length + newImages.length > 3) {
        alert("You can only upload up to 3 images.");
        return;
      }
      setImages((prevImages) => [...prevImages, ...newImages]);
      setLabelsForImages((prevLabels) => [
        ...prevLabels,
        ...newImages.map(() => []),
      ]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setLabelsForImages((prevLabels) =>
      prevLabels.filter((_, i) => i !== index)
    );
  };

  const isFormEmpty = () => {
    return input.trim() === "" && labelsForImages.flat().length === 0;
  };

  return (
    <div className="input-bar-container">
      <div className="filters">
        <CountryFilter onCountrySelect={handleCountrySelect}
        selectedCountry={selectedCountry} />

        <FilterDropdown
          label="Dietary requirements"
          options={healthLabels}
          selectedOptions={selectedHealthLabels}
          setSelectedOptions={setSelectedHealthLabels}
          isOpen={openDropdown === "health"}
          onOpen={() => setOpenDropdown("health")}
          onClose={() => setOpenDropdown(null)}
        />

        <FilterDropdown
          label="Cuisine"
          options={cuisineTypes}
          selectedOptions={selectedCuisineType}
          setSelectedOptions={setSelectedCuisineType}
          isOpen={openDropdown === "cuisine"}
          onOpen={() => setOpenDropdown("cuisine")}
          onClose={() => setOpenDropdown(null)}
        />
      </div>

      <form onSubmit={handleSubmit} className="input-bar-form">
        <div className="icon-buttons" title="Maximum 3 images allowed">
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
              multiple
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

        <button
          type="submit"
          className="search-button"
          disabled={loading || isFormEmpty()}
        >
          {loading ? "Searching" : "Search"}
        </button>
      </form>

      {/* {images.length <= 0 && ( */}
      <p
        style={{
          width: "680px",
          textAlign: "left",
          fontSize: "14px",
          color: "#505050",
          paddingTop: "10px",
        }}
      >
        Separate ingredients by comma or space.
      </p>
      {/* )} */}

      <div className="images-container">
        {images.map((image, index) => (
          <ImageRecognition
            key={index}
            image={image}
            onLabelsExtracted={(labels) => handleLabelsFromImage(labels, index)}
            onRemoveImage={() => handleRemoveImage(index)}
            label={labelsForImages[index]?.join(", ") || ""}
          />
        ))}
      </div>
    </div>
  );
};

export default InputBar;
