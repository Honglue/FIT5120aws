import React, { useRef, useEffect } from "react";
import "./FilterDropdown.css";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (selected: string[]) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
  isOpen,
  onOpen,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOption = (option: string) => {
    setSelectedOptions([option]);
    onClose();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const filterCount = selectedOptions.length;
  const selectedLabel = filterCount > 0 ? selectedOptions[0] : label;

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className="filter-button"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          isOpen ? onClose() : onOpen();
        }}
      >
        {selectedLabel}
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
                  type="radio"
                  name="filter-option"
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
