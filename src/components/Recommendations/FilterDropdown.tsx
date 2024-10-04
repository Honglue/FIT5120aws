import React, { useState, useEffect } from "react";
import "./FilterDropdown.css";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (selected: string[]) => void;
  isMultiSelect?: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
  isMultiSelect = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleClose = () => {
    setIsOpen(false); // Close dropdown when cross is clicked
  };

  useEffect(() => {
    console.log("Dropdown open state:", isOpen);
  }, [isOpen]);

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
        {label} {selectedOptions.length > 0 && `(${selectedOptions.length})`}
      </button>

      {isOpen && (
        <div className="filter-dropdown-menu">
          <div className="close-button" onClick={handleClose}>
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
