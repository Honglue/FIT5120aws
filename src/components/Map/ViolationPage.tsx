import React, { useState, useEffect } from "react";
import { ViolationBar } from "./ViolationBar";
import { FiArrowLeft } from "react-icons/fi";
import Loading from "../Loading/loading";
import Modal from "./Modal"; // Import the new Modal component
import "./ViolationPage.css";
import Legend from "./Legends/Legends";
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
  // eslint-disable-next-line
  const [filteredData, setFilteredData] = useState<any[]>([]);
  // eslint-disable-next-line
  const [globalData, setGlobalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNutritionType, setSelectedNutritionType] = useState("good");
  const [showModal, setShowModal] = useState(false);
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
        console.log(data)
        const parsedData = JSON.parse(data.body);
        setFilteredData(parsedData);

        const australiaData = parsedData.filter(
          // eslint-disable-next-line
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

  const renderNutritionCards = (
    // eslint-disable-next-line
    nutritionData: any[],
    isGoodNutrition: boolean
  ) => {
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
                  isGoodNutrition={isGoodNutrition}
                />

                <p
                  style={{ textAlign: "left", paddingLeft: "16px" }}
                  onClick={() => handleExampleClick(data.id)}
                >
                  Tap{" "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    here
                  </span>{" "}
                  to view food examples.
                </p>
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

      <div
        // className="bg-light"
        style={{
          backgroundColor: "#f0f4ff",
          color: "#4f46e5",
          borderRadius: "6px",
          border: "1px solid #4f46e5",
          padding: "16px",
          width: "100%",
          boxSizing: "border-box",
          textAlign: "left",
          margin: "30px 10px",
        }}
      >
        This page compares the dietary intake patterns from{" "}
        {selectedCountryName} with the Australian standards.
      </div>

      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="me-3">{selectedCountryName}</h2>
        <div
          className="d-flex border p-2 rounded-pill ms-auto"
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            // backgroundColor: "#f9f9f9",
            padding: "10px",
          }}
        >
          {/* Age filter */}
          <div className="me-4 p-1">
            <span className="me-2" style={{ paddingLeft: "10px" }}>
              Age:
            </span>
            <select
              id="age-group-select"
              value={selectedAgeGroup}
              onChange={handleAgeGroupChange}
              className="border-0 bg-light rounded-pill"
              style={{
                padding: "8px 20px",
                // backgroundColor: "#ffffff",
                // boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
                border: "2px solid #d3d3d3",
                cursor: "pointer",
                // transition: "box-shadow 0.2s ease-in-out",
              }}
            >
              <option value="7">All ages</option>
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
              Food Type:
            </span>
            <select
              id="nutrition-type-select"
              value={selectedNutritionType}
              onChange={handleNutritionTypeChange}
              className="border-0 bg-light rounded-pill"
              style={{
                padding: "8px 20px",
                // backgroundColor: "#ffffff",
                // boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                border: "1px solid #d3d3d3",
                cursor: "pointer",
                transition: "box-shadow 0.2s ease-in-out",
              }}
            >
              <option value="good">Healthy Foods</option>
              <option value="bad">Unhealthy Foods</option>
            </select>
          </div>
        </div>
      </div>

      {/* Conditionally render based on selectedNutritionType */}
      {loading ? (
        <Loading />
      ) : selectedNutritionType === "good" ? (
        <div className="nutrition-section mt-4">
          <h5
            className="mb-2"
            style={{ textAlign: "left", fontWeight: "bold" }}
          >
            Healthy Foods
          </h5>
          <p style={{ textAlign: "left" }}>
            Healthy foods provide essential nutrients for energy, growth, and
            overall health, helping to prevent chronic diseases.{" "}
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet"
              target="_blank"
              style={{ textDecoration: "underline" }}
            >
              {" "}
              Learn more.
            </a>
          </p>

          <Legend isGoodNutrition={true} />

          {renderNutritionCards(goodNutritionData, true)}
        </div>
      ) : (
        <div className="nutrition-section mt-4">
          <h5 className="mb-2" style={{ textAlign: "left" }}>
            Unhealthy Foods
          </h5>
          <p style={{ textAlign: "left" }}>
            Unhealthy foods, including overeating or undereating, leads to
            nutrient deficiencies or excesses, causing health issues such as
            obesity, diabetes.{" "}
            <a
              href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet"
              target="_blank"
              style={{ textDecoration: "underline" }}
            >
              Learn more.
            </a>
          </p>

          <Legend isGoodNutrition={false} />

          {renderNutritionCards(badNutritionData, false)}
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
