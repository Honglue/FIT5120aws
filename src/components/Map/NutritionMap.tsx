import React, { useState } from "react";
import { MapPage } from "./MapPage";
import { ViolationPage } from "./ViolationPage";

const NutritionMap: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(
    null
  );
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("7");
  const [isMapVisible, setIsMapVisible] = useState<boolean>(true);

  const handleCountrySelect = (
    countryId: string,
    countryName: string | null
  ) => {
    setSelectedCountry(countryId);
    setSelectedCountryName(countryName);
    setIsMapVisible(false);
    console.log(countryId);
  };

  const handleAgeGroupChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedAgeGroup(event.target.value);
  };

  const handleBackToMap = () => {
    setIsMapVisible(true);
    setSelectedCountry(null);
    setSelectedCountryName(null);
  };

  return (
    <div style={{ paddingTop: "40px" }}>
      {isMapVisible ? (
        <MapPage onCountrySelect={handleCountrySelect} />
      ) : (
        <ViolationPage
          selectedCountry={selectedCountry as string}
          selectedCountryName={selectedCountryName}
          selectedAgeGroup={selectedAgeGroup}
          handleAgeGroupChange={handleAgeGroupChange}
          handleBackToMap={handleBackToMap}
        />
      )}
    </div>
  );
};

export default NutritionMap;
