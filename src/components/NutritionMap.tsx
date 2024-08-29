import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
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
  country_ID: string;
  age_ID: string;
  variable_ID: string;
  median: number;
  lowerci_95: number;
  upperci_95: number;
}

const NutritionMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [filteredData, setFilteredData] = useState<NutritionData[]>([]);
  const [globalData, setGlobalData] = useState<NutritionData[]>([]); // New state for global data
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("7");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const highlightedCountries = [
    "Iraq",
    "Myanmar",
    "Afghanistan",
    "Syria",
    "Venezuela",
    "South Sudan",
  ];

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
        .on("click", function (_, d) {
          const countryId = String(d.id).padStart(3, "0");
          setSelectedCountry(countryId);
          if (countryId) {
            // console.log("Country ID found: ", countryId);
            handleCountryClick(countryId);
          } else {
            console.log("Country ID not found. Full object: ", d);
          }
        });
    });
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry) {
      handleCountryClick(selectedCountry);
    }
  }, [selectedAgeGroup]);

  const handleCountryClick = async (countryId: string) => {
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
        // console.log("Data: ", parsedData);
        // Separate the global data (country_ID = 0) from the rest
        const global = parsedData.filter((item: NutritionData) => Number(item.country_ID) === 0);
        const countryData = parsedData.filter((item: NutritionData) => Number(item.country_ID) !== 0);
        
        setGlobalData(global); // Store global data
        setFilteredData(countryData); // Store country-specific data
  
        // console.log("Filtered Country Data: ", countryData);
        // console.log("Global Data: ", global);
      } else {
        console.log("Unexpected response format:", data);
        setFilteredData([]);
        setGlobalData([]);
      }
    } catch (error) {
      console.error("Failed to fetch nutrition data:", error);
      setFilteredData([]);
      setGlobalData([]);
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
    // console.log(`country value: ${countryValue}`);
    // console.log(`global value: ${globalValue}`);
    if (globalValue === 0) {
      console.log('Global value is 0, returning 0 deviation.');
      return 0;
    }
    const deviation = ((countryValue - globalValue) / globalValue) * 100;
    // console.log(`Deviation calculated: ${deviation} (Country: ${countryValue}, Global: ${globalValue})`);
    return deviation;
  };
  
  return (
    <div className="container my-5">
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
          <option value="3">2-5 years</option>
          <option value="4">6-10 years</option>
          <option value="5">11-14 years</option>
          <option value="6">15-19 years</option>
        </select>
      </div>
  
      <div className="row mt-4">
        {Array.isArray(filteredData) &&
          filteredData.length > 0 &&
          Object.keys(variableMap).map((variableId) => {
            // console.log(`Processing variable ID: ${variableId}`);
            const variableIdNumber = Number(variableId);
            const foodVariableData = filteredData.find(
              (data) => Number(data.variable_ID) === variableIdNumber
            );
  
            let low = 0,
              medium = 0,
              high = 0;
  
            if (foodVariableData) {
              // console.log(`Found data for variable ID: ${variableId}`);
              const globalDataItem = globalData.find(
                (data) =>
                  Number(data.variable_ID) === variableIdNumber &&
                  Number(data.age_ID) === Number(selectedAgeGroup)
              );
  
              // if (globalDataItem) {
              //   console.log(`Found global data for variable ID: ${variableId}`);
              //   console.log(`Global median: ${globalDataItem.median}`);
              // } else {
              //   console.log(`No global data found for variable ID: ${variableId}`);
              // }
  
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
            }else {
              console.log(`No country data found for variable ID ${variableIdNumber}`);
            }
  
            console.log(`Rendering ViolationBar for ${variableId}`, {
              low,
              medium,
              high,
            });
  
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
  );}

export default NutritionMap;
