import React from "react";
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
  onCountrySelect?: (
    selectedCountry: string | null,
    selectedCountryName: string | null
  ) => void;
  isOpen: boolean; // Add prop to track if the dropdown is open
  onOpen: () => void; // Callback to open the dropdown
  onClose: () => void; // Callback to close the dropdown
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
  isMultiSelect = true,
  isCountrySelect = false,
  onCountrySelect,
  isOpen,
  onOpen,
  onClose,
}) => {
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

  const handleCountryChange = (
    selectedOption: SingleValue<{ label: string; value: string | undefined }>
  ) => {
    const selectedCountry = selectedOption?.value || null;
    const countryName = selectedOption?.label || null;
    onCountrySelect?.(selectedCountry, countryName);
  };

  const countries = getNames();
  const countryOptions = countries.map((country) => ({
    label: country,
    value: getCode(country) || undefined,
  }));

  // Calculate how many filters are applied
  const filterCount = selectedOptions.length;

  return (
    <div className="filter-dropdown">
      <button
        className="filter-button"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          isOpen ? onClose() : onOpen(); // Open/close logic
        }}
      >
        {/* Show label with the applied filter count */}
        {label} {filterCount > 0 ? `(${filterCount})` : ""}
      </button>

      {isOpen && !isCountrySelect && (
        <div className="filter-dropdown-menu">
          <div className="close-button" onClick={onClose}>
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

      {isOpen && isCountrySelect && (
        <div className="filter-dropdown-menu">
          <div className="close-button" onClick={onClose}>
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
