import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

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

      svg
        .append("g")
        .selectAll("path")
        .data(mapData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#69b3a2")
        .attr("stroke", "#ffffff")
        .on("click", function (event, d) {
          const countryId = String(d.id).padStart(3, "0");
          if (countryId) {
            console.log("Country ID found: ", countryId);
            handleCountryClick(countryId);
          } else {
            console.log("Country ID not found. Full object: ", d);
          }
        });
    });
  }, [nutritionData]);

  const handleCountryClick = (countryId: string) => {
    console.log(`Handling click for: ${countryId}`);

    const countryData = nutritionData.filter((data) => {
      const isMatch = data.country_numeric === countryId;
      console.log(
        `Comparing CSV country_numeric: ${data.country_numeric} with Clicked countryId: ${countryId} -> Match: ${isMatch}`
      );
      return isMatch;
    });

    console.log("Filtered Country Data: ", countryData);

    if (countryData.length > 0) {
      console.log("Nutritional Data for", countryId, countryData);
      setFilteredData(countryData);
    } else {
      console.log("No data available for", countryId);
      setFilteredData([]);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Nutrition Map</h1>
      <svg ref={svgRef} width={800} height={500}></svg>

      {filteredData.length > 0 && (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Age Group</th>
              <th>Food Variable</th>
              <th>Median</th>
              <th>Lower CI 95%</th>
              <th>Upper CI 95%</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data) => (
              <tr key={data.nutrition_ID}>
                <td>{data.age_ID}</td>
                <td>{data.variable_ID}</td>
                <td>{data.median}</td>
                <td>{data.lowerci_95}</td>
                <td>{data.upperci_95}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NutritionMap;
