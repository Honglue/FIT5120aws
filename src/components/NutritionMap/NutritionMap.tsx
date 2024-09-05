import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import ViolationBar from "./ViolationBar"; // Ensure this path is correct based on your file structure
import nutrition from "../../../public/images/nutrition.png";
import "./NutritionMap.css";

interface NutritionData {
  nutrition_ID: string;
  country_ID: string;
  age_ID: string;
  variable_ID: string;
  median: number;
  lowerci_95: number;
  upperci_95: number;
}

const goodNutritionIds = ["1", "2", "3", "4", "6", "10"];
const badNutritionIds = ["5", "7", "8", "9", "11"];

const NutritionMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [filteredData, setFilteredData] = useState<NutritionData[]>([]);
  const [globalData, setGlobalData] = useState<NutritionData[]>([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("7");
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(null); // New state for country name
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isMapVisible, setIsMapVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false); // **New state for loading**

  const highlightedCountries = [
    "Iraq",
    "Myanmar",
    "Afghanistan",
    "Syria",
    "Venezuela",
    "South Sudan",
  ];

  // Function to initialize and draw the map using D3
  const renderMap = () => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 500;

    const projection = d3.geoMercator().scale(130).translate([width / 2, height / 1.5]);
    const path = d3.geoPath().projection(projection);

    // Import and render the map
    import("@/assets/countries-110m.json").then((worldMapData) => {
      const typedWorldMapData = worldMapData as any;
      const mapData = feature(typedWorldMapData, typedWorldMapData.objects.countries) as any as FeatureCollection<Geometry, GeoJsonProperties>;

      const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "rgba(0, 0, 0, 0.8)")
        .style("color", "#fff")
        .style("padding", "5px")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("opacity", 0);

      svg.append("g")
        .selectAll("path")
        .data(mapData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", (d) => {
          const countryName = d.properties?.name;
          if (selectedCountry !== String(d.id).padStart(3, "0") && highlightedCountries.includes(countryName)) {
            return "#A3A6F9";
          }
          return selectedCountry === String(d.id).padStart(3, "0") ? "#6366F1" : "#D3D3D3";
        })
        .attr("stroke", "#ffffff")
        .on("mouseover", function (event, d) {
          const countryName = d.properties?.name;
          tooltip.style("opacity", 1).text(countryName)
            .style("left", `${event.pageX + 5}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", () => {
          tooltip.style("opacity", 0);
        })
        .on("click", function (_, d) {
          const countryId = String(d.id).padStart(3, "0");
          const countryName = d.properties?.name || null;
          setSelectedCountry(countryId);
          setSelectedCountryName(countryName);
          tooltip.style("opacity", 0);
          setIsMapVisible(false); // Auto-hide the map after a country is selected
        });
    });
  };
  const prevMapVisibility = useRef<boolean>(isMapVisible);
  useEffect(() => {
    if (!isMapVisible && prevMapVisibility.current) {
      // Fetch data for the selected country when the map is transitioning from visible to hidden
      if (selectedCountry) {
        handleCountryClick(selectedCountry);
      }
    }
  
    // Render the map when it's visible or when the selected country changes
    if (isMapVisible || selectedCountry) {
      renderMap();
    }

    prevMapVisibility.current = isMapVisible;
  }, [isMapVisible, selectedCountry, selectedAgeGroup]);

  const handleCountryClick = async (countryId: string) => {
    setLoading(true); // **Start loading when fetch begins**
    try {
      const response = await fetch(
        "https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/getNutritionData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country_id: countryId,
            age_id: selectedAgeGroup,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data && data.body) {
        const parsedData = JSON.parse(data.body);
          // Filter for data where country_ID is 036 (Australia)
        const australiaData = parsedData.filter(
          (item: NutritionData) => Number(item.country_ID) === 36
        );
        const countryData = parsedData.filter(
          (item: NutritionData) => Number(item.country_ID) === Number(countryId)
        );

        setFilteredData(countryData);
        setGlobalData(australiaData);
        
        console.log("Filtered Country Data:", countryData);
        console.log("Global Data:", australiaData)
      } else {
        console.log("Unexpected response format:", data);
        setFilteredData([]);
        setGlobalData([]);
      }
    } catch (error) {
      console.error("Failed to fetch nutrition data:", error);
      setFilteredData([]);
      setGlobalData([]);
    } finally {
      setLoading(false); // **Stop loading when fetch completes**
    }
  };

  const handleAgeGroupChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedAgeGroup(event.target.value);
  };

  const calculateDeviation = (
    countryValue: number,
    globalValue: number
  ): number => {
    if (globalValue === 0) {
      console.log("Global value is 0, returning 0 deviation.");
      return 0;
    }
    // return ((countryValue - globalValue) / globalValue) * 100;
    return ((globalValue - countryValue) / countryValue) * 100;
  };

  return (
    <div className="container my-5">
      <section className="hero">
        <div className="hero-image-container">
          <img src={nutrition} alt="Hands" className="hero-image" />
          <div className="dark-overlay"></div>
        </div>

        <div className="hero-content">
          <h1>
            Explore Your Country’s <br />
            Eating Habits
          </h1>
        </div>
      </section>

      <div
        style={{
          textAlign: "left",
        }}
      >
        <p>
          Explore Your Country's Eating Habits! Use our interactive map to
          discover the dietary patterns in your country. Click on your home
          country to see detailed insights into local eating habits,
          highlighting which foods are beneficial and which to limit. Whether
          you're looking to improve your diet or curious about how your country
          compares globally, this map is your guide to healthier eating. Start
          your journey today!
        </p>
      </div>

      {/* Button to toggle map visibility */}
      <div className="my-3">
        <button onClick={() => setIsMapVisible(!isMapVisible)}>
          {isMapVisible ? "Hide Map" : "Show Map"}
        </button>
      </div>

      {/* Conditionally render the map based on isMapVisible */}
      {isMapVisible && (
        <div className="pt-4">
          <svg ref={svgRef} width={800} height={500}></svg>
        </div>
      )}

      <div
        className="p-3 mt-4"
        style={{
          border: "1px solid #d3d3d3",
          borderRadius: "8px",
          width: "50%",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        <p style={{ margin: "0" }}>
          Please note: The values presented are compared against the global
          average. The highlighted countries represent the top countries of
          origin for refugees in Australia.
        </p>
      </div>

      <div className="mt-3">
        <label htmlFor="age-group-select">Filter by Age Group: </label>
        <select
          id="age-group-select"
          value={selectedAgeGroup}
          onChange={handleAgeGroupChange}
        >
          <option value="7">All</option>
          <option value="1">0-11 months</option>
          <option value="2">12-23 months</option>
          <option value="3">2-5 years</option>
          <option value="4">6-10 years</option>
          <option value="5">11-14 years</option>
          <option value="6">15-19 years</option>
        </select>
      </div>

      <div className="row mt-4">
        {/* include country name here */}
        {/* Good Nutrition Section */}
        <div className="col-12">
        {selectedCountryName && (
      <h1>Nutrition Data for {selectedCountryName}</h1>)}
          <h3>Good Nutrition</h3>
          <div className="border-bottom border-light pb-3 mb-4">
            {loading ? ( // **Display loading animation if data is being fetched**
              <div>Loading...</div>
            ) : (
              <div className="row">
                {goodNutritionIds.map((variableId) => {
                  const variableIdNumber = Number(variableId);
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

                    const globalMedian = globalDataItem
                      ? globalDataItem.median
                      : 0;
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
                    <div key={variableId} className="col-md-6">
                      <ViolationBar
                        nutritionId={variableId}
                        low={low}
                        medium={medium}
                        high={high}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bad Nutrition Section */}
        <div className="col-12">
          <h3>Bad Nutrition</h3>
          <div>
            {loading ? ( // **Display loading animation if data is being fetched**
              <div>Loading...</div>
            ) : (
              <div className="row">
                {badNutritionIds.map((variableId) => {
                  const variableIdNumber = Number(variableId);
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

                    const globalMedian = globalDataItem
                      ? globalDataItem.median
                      : 0;
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
                    <div key={variableId} className="col-md-6">
                      <ViolationBar
                        nutritionId={variableId}
                        low={low}
                        medium={medium}
                        high={high}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionMap;
