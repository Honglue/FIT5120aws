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
  const [jsonData, setJsonData] = useState<any>(null); // Separate state for the second API (raw JSON data)
  const [animatedSum, setAnimatedSum] = useState<number>(0); // To track the animated number sum
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null); // To track the current animation interval

  useEffect(() => {
    if (selectedCountry) {
      fetchChartData(selectedCountry.id); // Fetch data for the D3 chart
      fetchJsonData(selectedCountry.id); // Fetch raw JSON data for display
    }
  }, [selectedCountry]);

  // Fetch data for the chart
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

  // Fetch data for JSON display
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
      setJsonData(jsonResponse.body); // Store the raw JSON data for display
    } catch (error) {
      console.error("Error fetching JSON data", error);
    }
  };

  // Trigger chart drawing and animation after data is fetched
  useEffect(() => {
    if (chartData.length > 0) {
      drawChart(chartData);
      restartAnimation(chartData); // Restart the sum animation when data is available
    }
  }, [chartData]);

  // Function to animate the sum of the asylum values
  const animateSum = (chartData: { pop_year: number; asylum: number }[]) => {
    let currentSum = 0;
    let index = 0;
    const interval = setInterval(() => {
      if (index < chartData.length) {
        currentSum += chartData[index].asylum; // Summing up asylum numbers
        setAnimatedSum(currentSum);
        index++;
      } else {
        clearInterval(interval); // Stop when all data points are summed
      }
    }, 500); // Add the next point every 0.5 seconds
    return interval;
  };

  // Restart the animation for new data and clear the previous one
  const restartAnimation = (chartData: { pop_year: number; asylum: number }[]) => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }
    setAnimatedSum(0); // Reset the animated sum to 0
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

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(chartData.length));

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

      {/* Animated number display */}
      <div style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}>
        Total Asylum from 2010: {animatedSum}
      </div>

      {/* Display the fetched JSON data from the second API */}
      <div style={{ marginTop: "20px", fontSize: "14px", maxWidth: "600px", wordWrap: "break-word", backgroundColor: "#f9f9f9", padding: "10px", borderRadius: "8px" }}>
        <h3>Fetched JSON Data:</h3>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre> {/* Displaying the fetched JSON data */}
      </div>
    </div>
  );
};

export default TimeSeriesChart;
