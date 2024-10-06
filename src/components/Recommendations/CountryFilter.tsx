import React from "react";
import Select, { SingleValue } from "react-select";
import { getNames, getCode } from "country-list";
import "./FilterDropdown.css"; // Optional CSS for styling if needed

interface CountryFilterProps {
  onCountrySelect: (
    selectedCountry: string | null,
    selectedCountryName: string | null
  ) => void;
}

const CountryFilter: React.FC<CountryFilterProps> = ({ onCountrySelect }) => {
  // Get the list of countries
  const countries = getNames();
  const countryOptions = countries.map((country) => ({
    label: country,
    value: getCode(country) || undefined,
  }));

  // Handle country selection
  const handleCountryChange = (
    selectedOption: SingleValue<{ label: string; value: string | undefined }>
  ) => {
    const selectedCountry = selectedOption?.value || null;
    const selectedCountryName = selectedOption?.label || null;
    onCountrySelect(selectedCountry, selectedCountryName);
  };

  return (
    <div className="country-filter">
      <Select
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: "50px",
            textAlign: "left",
            width: "200px",
            padding: "4px 10px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#000",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected ? "#6366F1" : "f9f9f9",
            color: state.isSelected ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: "#d3d3d3",
            },
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
          }),
        }}
        options={countryOptions}
        onChange={handleCountryChange}
        placeholder="Country"
        isClearable
      />
    </div>
  );
};

export default CountryFilter;
