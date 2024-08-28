import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

// Import the ViolationBar component
import ViolationBar from "./ViolationBar"; // Ensure this path is correct based on your file structure

const variableMap: { [key: string]: string } = {
  1: "Fruits",
  2: "Non-starchy Vegetables",
  3: "Beans & Legumes",
  4: "Nuts & Seeds",
  5: "Refined Carbs",
  6: "Whole Grains",
  7: "Total Processed Meats",
  8: "Unprocessed Red Meats",
  9: "Saturated Fat",
  10: "Monounsaturated Fatty Acids",
  11: "Added Sugars",
};

interface NutritionData {
  nutrition_ID: string;
  country_code: string;
  age_ID: string;
  variable_ID: string;
  median: number;
  lowerci_95: number;
  upperci_95: number;
  country_numeric: string;
}

const NutritionMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [nutritionData, setNutritionData] = useState<NutritionData[]>([]);
  const [filteredData, setFilteredData] = useState<NutritionData[]>([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("7");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null); // Add state to track selected country

  // List of countries to highlight
  const highlightedCountries = [
    "Iraq",
    "Myanmar",
    "Afghanistan",
    "Syria",
    "Venezuela",
    "South Sudan",
  ];

  useEffect(() => {
    d3.csv("/final_nutrition_data.csv", (d) => {
      return {
        nutrition_ID: d.nutrition_ID as string,
        country_code: d.country_code as string,
        age_ID: d.age_ID as string,
        variable_ID: d.variable_ID as string,
        median: parseFloat(d.median as string),
        lowerci_95: parseFloat(d.lowerci_95 as string),
        upperci_95: parseFloat(d.upperci_95 as string),
        country_numeric: String(d.country_numeric).padStart(3, "0"),
      } as NutritionData;
    }).then((data) => {
      console.log("Loaded Nutrition Data: ", data);
      setNutritionData(data);
    });
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 500;

    const projection = d3
      .geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    import("@/assets/countries-110m.json").then((worldMapData) => {
      const typedWorldMapData = worldMapData as any;

      const mapData = feature(
        typedWorldMapData,
        typedWorldMapData.objects.countries
      ) as any as FeatureCollection<Geometry, GeoJsonProperties>;

      // Create a tooltip
      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "rgba(0, 0, 0, 0.8)")
        .style("color", "#fff")
        .style("padding", "5px")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("opacity", 0);

      svg
        .append("g")
        .selectAll("path")
        .data(mapData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", (d) => {
          const countryName = d.properties?.name;
          if (
            selectedCountry !== String(d.id).padStart(3, "0") &&
            highlightedCountries.includes(countryName)
          ) {
            return "#A3A6F9";
          }

          return selectedCountry === String(d.id).padStart(3, "0")
            ? "#6366F1"
            : "#D3D3D3";
        })
        .attr("stroke", "#ffffff")
        .on("mouseover", function (event, d) {
          const countryName = d.properties?.name;
          tooltip
            .style("opacity", 1)
            .text(countryName)
            .style("left", `${event.pageX + 5}px`)
            .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", () => {
          tooltip.style("opacity", 0);
        })
        .on("click", function (event, d) {
          const countryId = String(d.id).padStart(3, "0");
          setSelectedCountry(countryId); // Update selected country state
          if (countryId) {
            console.log("Country ID found: ", countryId);
            handleCountryClick(countryId);
          } else {
            console.log("Country ID not found. Full object: ", d);
          }
        });
    });
  }, [nutritionData, selectedCountry]);

  useEffect(() => {
    if (selectedCountry) {
      handleCountryClick(selectedCountry);
    }
  }, [selectedAgeGroup]);

  const handleCountryClick = (countryId: string) => {
    const countryData = nutritionData.filter((data) => {
      const isMatch = data.country_numeric === countryId;
      return isMatch;
    });

    const filteredByAge = selectedAgeGroup
      ? countryData.filter((data) => data.age_ID === selectedAgeGroup)
      : countryData;

    console.log("Filtered Country Data: ", filteredByAge);

    if (filteredByAge.length > 0) {
      console.log("Nutritional Data for", countryId, filteredByAge);
      setFilteredData(filteredByAge);
    } else {
      console.log("No data available for", countryId);
      setFilteredData([]);
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
    if (globalValue === 0) return 0; // Avoid division by zero
    const deviation = ((countryValue - globalValue) / globalValue) * 100;
    console.log(countryValue, globalValue, deviation);
    return deviation;
  };

  return (
    <div className="container my-5">
      {/* Age Group Filter */}
      <div className="pt-4">
        <svg ref={svgRef} width={800} height={500}></svg>
      </div>

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
          <option value="3">2-5</option>
          <option value="4">6-10</option>
          <option value="5">11-14</option>
          <option value="6">15-19</option>
        </select>
      </div>

      {/* Render bars for each food variable in two columns */}
      <div className="row mt-4">
        {Object.keys(variableMap).map((variableId) => {
          const foodVariableData = filteredData.find(
            (data) => data.variable_ID === variableId
          );

          // Initialize values for LOW, MEDIUM, HIGH categories
          let low = 0,
            medium = 0,
            high = 0;

          if (foodVariableData) {
            const globalData = nutritionData.find(
              (data) =>
                data.country_code === "GGG" &&
                data.variable_ID === foodVariableData.variable_ID
            );

            const globalMedian = globalData ? globalData.median : 0;
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
    </div>
  );
};

export default NutritionMap;
