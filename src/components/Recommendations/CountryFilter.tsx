import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { getNames, getCode } from "country-list"; // Get country names and alpha-2 codes
import iso31661 from "iso-3166-1"; // Use iso-3166-1 for numeric to alpha-2 conversion
import "./FilterDropdown.css"; // Optional CSS for styling if needed

interface CountryFilterProps {
  onCountrySelect: (
    selectedCountry: string | null,
    selectedCountryName: string | null
  ) => void;
  selectedCountry: string | null; // Numeric country code
}

const CountryFilter: React.FC<CountryFilterProps> = ({
  onCountrySelect,
  selectedCountry,
}) => {
  // Get the list of countries
  const countries = getNames();
  const countryOptions = countries.map((country) => ({
    label: country,
    value: getCode(country) || undefined, // Use the alpha-2 code
  }));

  // State for the selected country option
  const [selectedOption, setSelectedOption] = useState<SingleValue<{ label: string; value: string | undefined }>>(null);

  // Update the selected value when the selectedCountry prop changes (convert numeric to alpha-2)
  useEffect(() => {
    if (selectedCountry) {
      // Convert the numeric code to alpha-2 code using iso-3166-1
      const alpha2Code = iso31661.whereNumeric(selectedCountry)?.alpha2;
      if (alpha2Code) {
        const countryName = countries.find(
          (country) => getCode(country) === alpha2Code
        );
        if (countryName) {
          setSelectedOption({ label: countryName, value: alpha2Code });
        }
      }
    }
  }, [selectedCountry]);

  // Handle country selection
  const handleCountryChange = (
    selectedOption: SingleValue<{ label: string; value: string | undefined }>
  ) => {
    const selectedCountryValue = selectedOption?.value || null;
    const selectedCountryName = selectedOption?.label || null;
    setSelectedOption(selectedOption); // Set the selected country
    onCountrySelect(selectedCountryValue, selectedCountryName);
  };

  return (
    <div className="country-filter">
      <Select
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: "50px",
            textAlign: "left",
            width: "300px",
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
            backgroundColor: state.isSelected ? "#6366F1" : "#f9f9f9",
            color: state.isSelected ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: "#d3d3d3",
            },
          }),
        }}
        options={countryOptions}
        onChange={handleCountryChange}
        placeholder="Select country"
        isClearable
        value={selectedOption} // Set the selected value
      />
    </div>
  );
};

export default CountryFilter;
