import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

// Country list with ISO 3166 IDs
const countries = [
  { id: 368, name: "Iraq" },
  { id: 104, name: "Myanmar" },
  { id: 4, name: "Afghanistan" },
  { id: 760, name: "Syria" },
  { id: 862, name: "Venezuela" },
  { id: 728, name: "South Sudan" },
];

const TimeSeriesChart: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<{ id: number; name: string } | null>(null);
  const [chartData, setChartData] = useState<{ pop_year: number; refugee: number; asylum: number }[]>([]);
  const [jsonData, setJsonData] = useState<any>(null);
  const [animatedSum, setAnimatedSum] = useState<number>(0);
  const [imagePath, setImagePath] = useState<string>("");

  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selectedCountry) {
      fetchChartData(selectedCountry.id);
      fetchJsonData(selectedCountry.id);
    }
  }, [selectedCountry]);

  const fetchChartData = async (countryId: number) => {
    try {
      const response = await fetch("https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/refugeedata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country_id: countryId }),
      });
      const jsonResponse = await response.json();
      setChartData(jsonResponse.body);
    } catch (error) {
      console.error("Error fetching chart data", error);
    }
  };

  const fetchJsonData = async (countryId: number) => {
    try {
      const response = await fetch("https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/mulnutritiondata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country_id: countryId }),
      });
  
      const jsonResponse = await response.json();
  
      // Log the entire parsed JSON response
      console.log("Full JSON Response:", jsonResponse);
  
      // Since jsonResponse.body is an array, access the first element
      if (jsonResponse.body && jsonResponse.body.length > 0) {
        const jsonData = jsonResponse.body[0]; // Get the first object in the array
        console.log("Fetched JSON Data:", jsonData); // Log the fetched data
  
        setJsonData(jsonData); // Set the first item as jsonData
  
        // Logic to handle image path based on underweight value
        const underweight = parseFloat(jsonData.underweight);
        if (underweight > 3) {
          setImagePath("../../../public/images/stats4.png");
        } else if (underweight > 2) {
          setImagePath("../../../public/images/stats3.png");
        } else if (underweight > 1) {
          setImagePath("../../../public/images/stats2.png");
        } else {
          setImagePath("../../../public/images/stats1.png");
        }
      } else {
        console.error("Error: No data found in 'body' array");
      }
  
    } catch (error) {
      console.error("Error fetching JSON data", error);
    }
  };
  

  useEffect(() => {
    if (chartData.length > 0) {
      drawChart(chartData);
      restartAnimation(chartData);
    }
  }, [chartData]);

  const animateSum = (chartData: { pop_year: number; asylum: number }[]) => {
    let currentSum = 0;
    let index = 0;
    const interval = setInterval(() => {
      if (index < chartData.length) {
        currentSum += chartData[index].asylum;
        setAnimatedSum(currentSum);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 500);
    return interval;
  };

  const restartAnimation = (chartData: { pop_year: number; asylum: number }[]) => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }
    setAnimatedSum(0);
    const newInterval = animateSum(chartData);
    animationIntervalRef.current = newInterval;
  };

  const drawChart = (chartData: { pop_year: number; refugee: number; asylum: number }[]) => {
    d3.select("#chart").selectAll("*").remove();
    const margin = { top: 10, right: 100, bottom: 50, left: 60 },
      width = 600 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain([d3.min(chartData, (d) => d.pop_year)!, d3.max(chartData, (d) => d.pop_year)!])
      .range([0, width]);

    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).ticks(chartData.length));

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => Math.max(d.refugee, d.asylum))!])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .text("Year");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", `translate(-40,${height / 2})rotate(-90)`)
      .text("Population");

    const lineRefugee = d3
      .line<{ pop_year: number; refugee: number }>()
      .x((d) => x(d.pop_year))
      .y((d) => y(d.refugee));

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", lineRefugee);

    const lineAsylum = d3
      .line<{ pop_year: number; asylum: number }>()
      .x((d) => x(d.pop_year))
      .y((d) => y(d.asylum));

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", lineAsylum);

    // Add data points and tooltips for refugees
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#f9f9f9")
      .style("border", "1px solid #d3d3d3")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("opacity", 0)
      .style("pointer-events", "none");

    svg
      .selectAll(".dot-refugee")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot-refugee")
      .attr("cx", (d) => x(d.pop_year))
      .attr("cy", (d) => y(d.refugee))
      .attr("r", 5)
      .attr("fill", "blue")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`<strong>Year:</strong> ${d.pop_year}<br><strong>Refugees:</strong> ${d.refugee}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    svg
      .selectAll(".dot-asylum")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot-asylum")
      .attr("cx", (d) => x(d.pop_year))
      .attr("cy", (d) => y(d.asylum))
      .attr("r", 5)
      .attr("fill", "red")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`<strong>Year:</strong> ${d.pop_year}<br><strong>Asylum Seekers:</strong> ${d.asylum}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    svg
      .append("text")
      .attr("transform", `translate(${x(chartData[chartData.length - 1].pop_year) + 5},${y(chartData[chartData.length - 1].refugee)})`)
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "blue")
      .text("Refugees");

    svg
      .append("text")
      .attr("transform", `translate(${x(chartData[chartData.length - 1].pop_year) + 5},${y(chartData[chartData.length - 1].asylum)})`)
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "red")
      .text("Asylum");
  };

  const renderBar = (label: string, value: number | string) => {
    // Ensure the value is a number, parse it if it's a string
    const numericValue = typeof value === "string" ? parseFloat(value) : value;
  
    if (isNaN(numericValue)) {
      console.error(`Invalid value for ${label}:`, value);
      return null;
    }
  
    // Calculate the percentage (100 - value)
    const percentage = (100 - numericValue).toFixed(0);
  
    // Use d3 to interpolate the color from green (100%) to light yellow (0%)
    const colorScale = d3.interpolate("lightgreen", "red");
  
    // Calculate the color based on the percentage (scaled from 0 to 1 for d3.interpolate)
    const barColor = colorScale(numericValue / 100);
  
    return (
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
        <span>{label}</span>
        <div
          style={{
            height: "30px",
            width: "100%",
            backgroundColor: "#ddd",
            borderRadius: "5px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${percentage}%`,
              backgroundColor: barColor, // Dynamic color based on value
              transition: "width 0.5s ease, background-color 0.5s ease",
            }}
          ></div>
          <span style={{ position: "absolute", top: "5px", right: "10px" }}>{percentage}%</span>
        </div>
      </div>
    );
  };
  

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "40px" }}>
      <div>
        <label>Select Country:</label>
        <select onChange={(e) => setSelectedCountry(countries[parseInt(e.target.value)])}>
          <option>Select a country</option>
          {countries.map((country, index) => (
            <option key={country.id} value={index}>
              {country.name}
            </option>
          ))}
        </select>
        <div id="chart"></div>
      </div>

      <div style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
        Total Asylum from 2010: {animatedSum}
      </div>

      {/* Render visual bars for wasting, stunting, and underweight */}
      {jsonData && (
        <div style={{ width: "400px" }}>
          {renderBar("Wasting", jsonData?.wasting)}
          {renderBar("Stunting", jsonData?.stunting)}
          {renderBar("Underweight", jsonData?.underweight)}
        </div>
      )}

      {/* Display the corresponding image */}
      <div>
        {imagePath && <img src={imagePath} alt="Underweight status" style={{ width: "300px", height: "auto" }} />}
      </div>

      <div style={{ marginTop: "20px", fontSize: "14px", maxWidth: "600px", wordWrap: "break-word", backgroundColor: "#f9f9f9", padding: "10px", borderRadius: "8px" }}>
        <h3>Fetched JSON Data:</h3>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default TimeSeriesChart;
