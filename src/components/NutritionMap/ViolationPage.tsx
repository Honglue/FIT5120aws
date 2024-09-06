import React, { useState, useEffect } from "react";
import ViolationBar from "./ViolationBar"; // Assuming the path is correct
import { FiArrowLeft } from "react-icons/fi"; // Icon for the back button

interface ViolationPageProps {
  selectedCountry: string;
  selectedCountryName: string | null;
  selectedAgeGroup: string;
  handleAgeGroupChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBackToMap: () => void;
}

const goodNutritionIds = ["1", "2", "3", "4", "6", "10"];
const badNutritionIds = ["5", "7", "8", "9", "11"];

const ViolationPage: React.FC<ViolationPageProps> = ({
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

        // Assuming fetching global data for Australia
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

  return (
    <div className="container mt-4" style={{ maxWidth: "900px" }}>
      <div className="d-flex align-items-center mb-3">
        <button
          className="btn btn-link p-0"
          onClick={handleBackToMap}
          style={{ color: "#6366F1" }}
        >
          <FiArrowLeft size={20} /> Back
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
        </div>
      </div>

      <div className="nutrition-section mb-5">
        <h5 className="mb-4" style={{ textAlign: "left" }}>
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

        <div className="row">
          {loading ? (
            <div>Loading...</div>
          ) : (
            goodNutritionIds.map((id) => {
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

              return (
                <div key={id} className="col-md-6 col-12 mb-4">
                  <div
                    className="nutrition-card p-4 border"
                    style={{
                      width: "100%",
                      height: "auto",
                      boxShadow: "none",
                      borderRadius: "20px",
                    }}
                  >
                    <ViolationBar
                      nutritionId={id}
                      low={low}
                      medium={medium}
                      high={high}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="nutrition-section">
        <h5 className="mb-4" style={{ textAlign: "left" }}>
          Bad Nutrition
        </h5>

        <p style={{ textAlign: "left" }}>
          Bad nutrition, including overeating or undereating, leads to nutrient
          deficiencies or excesses, causing health issues such as obesity,
          diabetes, or malnutrition.
          <a
            href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet"
            target="_blank"
            style={{ color: "#6366F1" }}
          >
            {" "}
            Learn more.
          </a>
        </p>

        <div className="row">
          {loading ? (
            <div>Loading...</div>
          ) : (
            badNutritionIds.map((id) => {
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

                if (deviation > 30) {
                  low = 0;
                  medium = 0;
                  high = 100;
                } else if (deviation > 10) {
                  low = 0;
                  medium = 100;
                  high = 0;
                } else {
                  low = 100;
                  medium = 0;
                  high = 0;
                }
              }

              return (
                <div key={id} className="col-md-6 col-12 mb-4">
                  <div
                    className="nutrition-card p-4 border"
                    style={{
                      width: "100%",
                      height: "auto",
                      boxShadow: "none",
                      borderRadius: "20px",
                    }}
                  >
                    <ViolationBar
                      nutritionId={id}
                      low={low}
                      medium={medium}
                      high={high}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ViolationPage;
