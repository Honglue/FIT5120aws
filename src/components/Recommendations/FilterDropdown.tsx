import React from "react";
import "./FilterDropdown.css";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (selected: string[]) => void;
  isMultiSelect?: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
  isMultiSelect = true,
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
        {`${label} ${filterCount > 0 ? `(${filterCount})` : ""}`}
      </button>

      {isOpen && (
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
    </div>
  );
};

export default FilterDropdown;
