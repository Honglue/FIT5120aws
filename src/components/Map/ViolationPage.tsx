import React, { useState, useEffect } from "react";
import { ViolationBar } from "./ViolationBar";
import { FiArrowLeft } from "react-icons/fi";
import Loading from "../Loading/loading";
import Modal from "./Modal"; // Import the new Modal component
import "./ViolationPage.css";

interface ViolationPageProps {
  selectedCountry: string;
  selectedCountryName: string | null;
  selectedAgeGroup: string;
  handleAgeGroupChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBackToMap: () => void;
}

const goodNutritionIds = ["1", "2", "3", "4", "6", "10"];
const badNutritionIds = ["5", "7", "8", "9", "11"];

export const ViolationPage: React.FC<ViolationPageProps> = ({
  selectedCountry,
  selectedCountryName,
  selectedAgeGroup,
  handleAgeGroupChange,
  handleBackToMap,
}) => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [globalData, setGlobalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNutritionType, setSelectedNutritionType] = useState("good");
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [selectedNutritionId, setSelectedNutritionId] = useState<string | null>(
    null
  ); // Manage selected nutrition item

  const handleNutritionTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedNutritionType(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/getNutritionData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country_id: selectedCountry,
              age_id: selectedAgeGroup,
            }),
          }
        );
        const data = await response.json();
        const parsedData = JSON.parse(data.body);
        setFilteredData(parsedData);

        const australiaData = parsedData.filter(
          (item: any) => Number(item.country_ID) === 36
        );
        setGlobalData(australiaData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCountry, selectedAgeGroup]);

  const calculateDeviation = (
    countryValue: number,
    globalValue: number
  ): number => {
    if (globalValue === 0) {
      console.log("Global value is 0, returning 0 deviation.");
      return 0;
    }
    return ((globalValue - countryValue) / countryValue) * 100;
  };

  // Group the data by good and bad nutrition
  const getNutritionData = (ids: string[]) => {
    return ids.map((id) => {
      const variableIdNumber = Number(id);
      const foodVariableData = filteredData.find(
        (data) => Number(data.variable_ID) === variableIdNumber
      );

      let low = 0,
        medium = 0,
        high = 0;

      if (foodVariableData) {
        const globalDataItem = globalData.find(
          (data) =>
            Number(data.variable_ID) === variableIdNumber &&
            Number(data.age_ID) === Number(selectedAgeGroup)
        );

        const globalMedian = globalDataItem ? globalDataItem.median : 0;
        const deviation = calculateDeviation(
          foodVariableData.median,
          globalMedian
        );

        if (deviation > 25) {
          low = 100;
          medium = 0;
          high = 0;
        } else if (deviation > 10) {
          low = 0;
          medium = 100;
          high = 0;
        } else {
          low = 0;
          medium = 0;
          high = 100;
        }
      }

      return {
        id,
        low,
        medium,
        high,
      };
    });
  };

  const goodNutritionData = getNutritionData(goodNutritionIds);
  const badNutritionData = getNutritionData(badNutritionIds);

  const handleExampleClick = (id: string) => {
    setSelectedNutritionId(id);
    setShowModal(true); // Show the modal when clicked
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedNutritionId(null);
  };

  const renderNutritionCards = (nutritionData: any[]) => {
    return (
      <div className="row">
        {nutritionData.map((data) => (
          <div key={data.id} className="col-md-4 col-12 mb-4">
            <div className="nutrition-card-container">
              <div
                className="nutrition-card p-3"
                style={{
                  width: "100%",
                  height: "auto",
                  boxShadow: "none",
                }}
              >
                <ViolationBar
                  nutritionId={data.id}
                  low={data.low}
                  medium={data.medium}
                  high={data.high}
                />
              </div>
              {/* Hidden button to display on hover */}
              <div className="hover-overlay">
                <button
                  className="example-button"
                  onClick={() => handleExampleClick(data.id)}
                >
                  See Example
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "80vw" }}>
      <div className="d-flex align-items-center mb-3">
        <button
          className="btn btn-link p-0"
          onClick={handleBackToMap}
          style={{ color: "#6366F1" }}
        >
          <FiArrowLeft size={20} /> Back to Map
        </button>
      </div>

      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="me-3">{selectedCountryName}</h2>
        <div className="d-flex border p-2 rounded-pill ms-auto">
          <div className="me-4 p-1">
            <span className="me-2" style={{ paddingLeft: "10px" }}>
              Age:
            </span>
            <select
              id="age-group-select"
              value={selectedAgeGroup}
              onChange={handleAgeGroupChange}
              className="border-0 bg-light rounded-pill"
            >
              <option value="7">Select age</option>
              <option value="1">0-11 months</option>
              <option value="2">12-23 months</option>
              <option value="3">2-5 years</option>
              <option value="4">6-10 years</option>
              <option value="5">11-14 years</option>
              <option value="6">15-19 years</option>
            </select>
          </div>

          {/* Nutrition type filter (Good or Bad) */}
          <div className="me-4 p-1">
            <span className="me-2" style={{ paddingLeft: "10px" }}>
              Nutrition Type:
            </span>
            <select
              id="nutrition-type-select"
              value={selectedNutritionType}
              onChange={handleNutritionTypeChange}
              className="border-0 bg-light rounded-pill"
            >
              <option value="good">Good Nutrition</option>
              <option value="bad">Bad Nutrition</option>
            </select>
          </div>
        </div>
      </div>

      <div
        className="bg-light"
        style={{
          // backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          padding: "20px",
          border: "1px solid #ccc",
          width: "100%",
          boxSizing: "border-box",
          color: "#333",
          textAlign: "left",
        }}
      >
        Comparing dieatary from {selectedCountryName} with the global average
        intake.
      </div>

      {/* Conditionally render based on selectedNutritionType */}
      {loading ? (
        <Loading />
      ) : selectedNutritionType === "good" ? (
        <div className="nutrition-section mt-4">
          <h5 className="mb-2" style={{ textAlign: "left", fontWeight: 500 }}>
            Good Nutrition
          </h5>
          <p style={{ textAlign: "left" }}>
            Good nutrition provides essential nutrients for energy, growth, and
            overall health, helping to prevent chronic diseases.{" "}
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet"
              target="_blank"
              style={{ color: "#6366F1" }}
            >
              {" "}
              Learn more.
            </a>
          </p>

          {renderNutritionCards(goodNutritionData)}
        </div>
      ) : (
        <div className="nutrition-section">
          <h5 className="mb-4" style={{ textAlign: "left" }}>
            Bad Nutrition
          </h5>
          <p style={{ textAlign: "left" }}>
            Bad nutrition, including overeating or undereating, leads to
            nutrient deficiencies or excesses, causing health issues such as
            obesity, diabetes, or malnutrition.
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet"
              target="_blank"
              style={{ color: "#6366F1" }}
            >
              {" "}
              Learn more.
            </a>
          </p>

          {renderNutritionCards(badNutritionData)}
        </div>
      )}

      {/* Modal for displaying example */}
      <Modal
        show={showModal}
        onClose={closeModal}
        nutritionId={selectedNutritionId || ""}
      />
    </div>
  );
};
