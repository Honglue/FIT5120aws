import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./StatsSource.css";
import LoadingBar from "../Loading/loading";

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
  const [selectedCountry, setSelectedCountry] = useState<{
    id: number;
    name: string;
  } | null>(null); // Changed to null for the default
  const [chartData, setChartData] = useState<
    { pop_year: number; refugee: number }[]
  >([]);
  // eslint-disable-next-line
  const [jsonData, setJsonData] = useState<any>(null);
  const [animatedSum, setAnimatedSum] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selectedCountry) {
      setLoading(true);
      fetchChartData(selectedCountry.id);
      fetchJsonData(selectedCountry.id);
    }
  }, [selectedCountry]);

  const fetchChartData = async (countryId: number) => {
    try {
      const response = await fetch(
        "https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/refugeedata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country_id: countryId }),
        }
      );
      const jsonResponse = await response.json();
      setChartData(jsonResponse.body);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chart data", error);
      setLoading(false);
    }
  };

  const fetchJsonData = async (countryId: number) => {
    try {
      const response = await fetch(
        "https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/mulnutritiondata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country_id: countryId }),
        }
      );

      const jsonResponse = await response.json();

      if (jsonResponse.body && jsonResponse.body.length > 0) {
        const jsonData = jsonResponse.body[0];
        console.log("Fetched JSON Data:", jsonData);
        setJsonData(jsonData);
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

  const animateSum = (chartData: { pop_year: number; refugee: number }[]) => {
    let currentSum = 0;
    let index = 0;
    const interval = setInterval(() => {
      if (index < chartData.length) {
        currentSum += chartData[index].refugee;
        setAnimatedSum(currentSum);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return interval;
  };

  const restartAnimation = (
    chartData: { pop_year: number; refugee: number }[]
  ) => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }
    setAnimatedSum(0);
    const newInterval = animateSum(chartData);
    animationIntervalRef.current = newInterval;
  };

  const drawChart = (chartData: { pop_year: number; refugee: number }[]) => {
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
      .domain([
        d3.min(chartData, (d) => d.pop_year)!,
        d3.max(chartData, (d) => d.pop_year)!,
      ])
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3.axisBottom(x).ticks(chartData.length).tickFormat(d3.format("d")) // Format ticks as integers (no commas)
      );

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(chartData, (d) => d.refugee)!])
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
      .text(`${selectedCountry?.name} Refugees Population in Australia`);

    const lineRefugee = d3
      .line<{ pop_year: number; refugee: number }>()
      .x((d) => x(d.pop_year))
      .y((d) => y(d.refugee));

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "#4b4ade")
      .attr("stroke-width", 2)
      .attr("d", lineRefugee);

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
      .attr("fill", "#4b4ade")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>Year:</strong> ${d.pop_year}<br><strong>Refugees:</strong> ${d.refugee}`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
  };

  const renderBar = (label: string, value: number | string) => {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      console.error(`Invalid value for ${label}:`, value);
      return null;
    }

    const percentage = (100 - numericValue).toFixed(0);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        {/* Description with emphasized information */}
        <p style={{ margin: "0", textAlign: "left", fontSize: "16px" }}>
          <span style={{ fontWeight: "medium", fontSize: "22px" }}>
            {percentage}%
          </span>{" "}
          <span className="lead">of them are</span>{" "}
          <span
            style={{ fontWeight: "medium", color: "#333", fontSize: "22px" }}
          >
            {label}
          </span>
        </p>

        {/* Thin bar to represent the percentage */}
        <div
          style={{
            height: "20px",
            width: "100%",
            backgroundColor: "#EAEBFF",
            borderRadius: "5px",
            overflow: "hidden",
            position: "relative",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${percentage}%`,
              backgroundColor: "#6366F1",
              transition: "width 0.5s ease, background-color 0.5s ease",
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div style={{ paddingBottom: "40px" }}>
      <header className="m-5 pt-2">
        <h2 style={{ fontWeight: "500", textAlign: "center" }}>
          Every year Victoria welcomes over 4,000 refugees and <br />
          many of them face challenges with malnutrition
        </h2>

        <p className="lead text-center" style={{ fontSize: "18px" }}>
          Discover the top countries they come from and learn about their
          nutritional status below.
          <br />
          <span>
            This data is sourced from the{" "}
            <a
              href="https://platform.who.int/nutrition/malnutrition-database/database-search"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-underline"
              style={{
                color: "#6366f1",
              }}
              onClick={(e) => {
                const userConfirmed = window.confirm(
                  "You are being redirected to the WHO Nutrition Database. Do you want to continue?"
                );
                if (!userConfirmed) {
                  e.preventDefault();
                }
              }}
            >
              WHO Nutrition Database
            </a>
            .
          </span>
        </p>

        <div className="d-flex justify-content-center">
          <div className="d-flex border p-2 rounded-pill custom-select-wrapper">
            <div className="d-flex justify-content-between align-items-center">
              <span
                className="custom-select-label"
                style={{ paddingLeft: "10px" }}
              >
                Select Country
              </span>
              <div className="custom-select-container">
                <select
                  className="custom-select"
                  onChange={(e) =>
                    setSelectedCountry(countries[parseInt(e.target.value)])
                  }
                >
                  <option value={-1}>Select</option>
                  {countries.map((country, index) => (
                    <option key={country.id} value={index}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Display message if no country is selected */}
      {!selectedCountry ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            paddingTop: "20px",
            paddingBottom: "6px",
            backgroundColor: "#f0f4ff", // Light background color for contrast
            borderRadius: "10px", // Rounded corners for aesthetics
            border: "1px solid #4f46e5",
            maxWidth: "400px",
            margin: "40px auto",
          }}
        >
          <p
            className="lead"
            style={{
              fontSize: "16px", // Larger font size
              color: "#4f46e5", // Color to match your theme
            }}
          >
            Please select a country to get started
          </p>
        </div>
      ) : loading ? (
        <LoadingBar />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <div id="chart"></div>

          <div>
            <h1
              style={{
                fontWeight: "bold",
                fontSize: "56px",
                color: "#4f46e5",
                // textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                letterSpacing: "1.5px",
              }}
            >
              {animatedSum}
            </h1>
            <p className="lead" style={{ fontSize: "18px" }}>
              Total number of refugees from {selectedCountry?.name} since 2010
            </p>

            {/* Render visual bars for wasting, stunting, and underweight */}
            <div style={{ width: "400px" }}>
              {renderBar("Too Thin", jsonData?.wasting)}
              {renderBar("Too Short", jsonData?.stunting)}
              {renderBar("Underweight", jsonData?.underweight)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSeriesChart;
