import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import { getNames, getCode } from "country-list";
import "./FilterDropdown.css";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (selected: string[]) => void;
  isMultiSelect?: boolean;
  isCountrySelect?: boolean;
  onCountrySelect?: (selectedCountry: string | null, selectedCountryName: string | null) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
  isMultiSelect = true,
  isCountrySelect = false,
  onCountrySelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(null); // State to store selected country name

  const toggleOption = (option: string) => {
    if (isMultiSelect) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(
          selectedOptions.filter((selected) => selected !== option)
        );
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleCountryChange = (selectedOption: SingleValue<{ label: string; value: string | undefined }>) => {
    const selectedCountry = selectedOption?.value || null;
    const countryName = selectedOption?.label || null;
    setSelectedCountryName(countryName); // Update the selected country name
    onCountrySelect?.(selectedCountry, countryName);
  };

  const countries = getNames();
  const countryOptions = countries.map((country) => ({
    label: country,
    value: getCode(country) || undefined, // Adjusted to allow undefined
  }));

  return (
    <div className="filter-dropdown">
      <button
        className="filter-button"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {/* Display selected country name if selected, otherwise default label */}
        {selectedCountryName ? selectedCountryName : label}
      </button>

      {isOpen && !isCountrySelect && (
        <div className="filter-dropdown-menu">
          <div className="close-button" onClick={() => setIsOpen(false)}>
            &times;
          </div>
          <div className="dropdown-options-container">
            {options.map((option) => (
              <label key={option} className="dropdown-option">
                <input
                  type={isMultiSelect ? "checkbox" : "radio"}
                  checked={selectedOptions.includes(option)}
                  onChange={() => toggleOption(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* If it's country selection, show the Select component */}
      {isOpen && isCountrySelect && (
        <div className="filter-dropdown-menu">
          <div className="close-button" onClick={() => setIsOpen(false)}>
            &times;
          </div>
          <Select
            options={countryOptions}
            onChange={handleCountryChange}
            placeholder="Select a country"
          />
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
