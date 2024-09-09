import React, { useState, useEffect } from "react";
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
  const [data, setData] = useState<{ year: number; refugee: number; asylum: number }[]>([]);

  useEffect(() => {
    if (selectedCountry) {
      fetchData(selectedCountry.id);
    }
  }, [selectedCountry]);

  // Fetch data for the selected country
  const fetchData = async (countryId: number) => {
    try {
      const response = await fetch("https://cykcougbc2.execute-api.us-east-1.amazonaws.com/prod/refugeedata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country_id: countryId }),
      });
      const jsonResponse = await response.json();
      setData(jsonResponse.body);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // Draw chart after data is fetched
  useEffect(() => {
    if (data.length > 0) {
      drawChart(data);
    }
  }, [data]);

  const drawChart = (chartData: { year: number; refugee: number; asylum: number }[]) => {
    d3.select("#chart").selectAll("*").remove();

    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X-axis for years
    const x = d3.scaleLinear().domain([d3.min(chartData, (d) => d.year)!, d3.max(chartData, (d) => d.year)!]).range([0, width]);
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(chartData.length));

    // Y-axis for refugee and asylum numbers
    const y = d3.scaleLinear().domain([0, d3.max(chartData, (d) => Math.max(d.refugee, d.asylum))!]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Create line for refugee data
    const lineRefugee = d3
      .line<{ year: number; refugee: number }>()
      .x((d) => x(d.year))
      .y((d) => y(d.refugee));

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", lineRefugee);

    // Create line for asylum data
    const lineAsylum = d3
      .line<{ year: number; asylum: number }>()
      .x((d) => x(d.year))
      .y((d) => y(d.asylum));

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", lineAsylum);

    // Add label for refugee line
    svg
      .append("text")
      .attr("transform", `translate(${x(chartData[chartData.length - 1].year)},${y(chartData[chartData.length - 1].refugee)})`)
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "blue")
      .text("Refugees");

    // Add label for asylum line
    svg
      .append("text")
      .attr("transform", `translate(${x(chartData[chartData.length - 1].year)},${y(chartData[chartData.length - 1].asylum)})`)
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "red")
      .text("Asylum");

    // Tooltip setup
    const tooltip = d3.select("#tooltip").style("opacity", 0);

    // Create dots for refugee data
    svg
      .selectAll(".dot-refugee")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot-refugee")
      .attr("cx", (d) => x(d.year))
      .attr("cy", (d) => y(d.refugee))
      .attr("r", 5)
      .attr("fill", "blue")
      .on("mouseover", function (event, d) {
        tooltip.style("opacity", 1).text(`Year: ${d.year}, Refugees: ${d.refugee}`);
      })
      .on("mousemove", function (event) {
        tooltip.style("left", `${event.pageX + 5}px`).style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });

    // Create dots for asylum data
    svg
      .selectAll(".dot-asylum")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("class", "dot-asylum")
      .attr("cx", (d) => x(d.year))
      .attr("cy", (d) => y(d.asylum))
      .attr("r", 5)
      .attr("fill", "red")
      .on("mouseover", function (event, d) {
        tooltip.style("opacity", 1).text(`Year: ${d.year}, Asylum: ${d.asylum}`);
      })
      .on("mousemove", function (event) {
        tooltip.style("left", `${event.pageX + 5}px`).style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });
  };

  return (
    <div>
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
      </div>

      <div id="chart"></div>
      <div id="tooltip" style={{ position: "absolute", opacity: 0, background: "lightgray", padding: "5px" }}></div>
    </div>
  );
};

export default TimeSeriesChart;
