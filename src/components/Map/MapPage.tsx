import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import Select from "react-select";
// eslint-disable-next-line
import { getNames, getCode } from "country-list";
import "./MapPage.css";

interface MapPageProps {
  onCountrySelect: (countryId: string, countryName: string | null) => void;
}

const highlightedCountries = [
  "Iraq",
  "Myanmar",
  "Afghanistan",
  "Syria",
  "Venezuela",
  "South Sudan",
];

const CountrySearch: React.FC<MapPageProps> = ({ onCountrySelect }) => {
  const countries = getNames();
  const options = countries.map((country: string) => ({
    label: country,
    value: getCode(country),
  }));

  const [selectedCountry, setSelectedCountry] = useState(null);
  // eslint-disable-next-line
  const handleCountrySelect = (selectedOption: any) => {
    setSelectedCountry(selectedOption);

    if (selectedOption) {
      const countryId = selectedOption.value;
      const countryName = selectedOption.label;
      onCountrySelect(countryId, countryName);
    }
  };

  return (
    <div style={{ maxWidth: "400px", marginBottom: "20px" }}>
      <Select
        options={options}
        value={selectedCountry}
        onChange={handleCountrySelect}
        placeholder="Select a country"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: "50px",
            textAlign: "left",
            width: "300px",
            margin: "10px auto", // Centered the select box
            padding: "5px 20px",
            backgroundColor: "f9f9f9",
            border: "1px solid #ddd",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#999",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected ? "#6366F1" : "f9f9f9",
            color: state.isSelected ? "#fff" : "#000",
            "&:hover": {
              backgroundColor: "#e0e7ff",
            },
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
          }),
        }}
      />
    </div>
  );
};

const NutritionMapInfo = () => {
  const items = [
    { label: "Select any country from the map", active: false },
    { label: "You will be directed to the next page", active: true },
    {
      label:
        "The country's nutrition will be compared to the Australian average",
      active: false,
    },
  ];

  return (
    <div style={{ maxWidth: "50%" }}>
      <div
        className="pt-4"
        style={{
          maxWidth: "400px",
          marginBottom: "20px",
          textAlign: "left",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ fontWeight: "normal", marginBottom: "10px" }}>
          Nutritional Map
        </h2>
        <p style={{ fontSize: "16px" }}>
          Explore your countries dietary patterns comparing to Australian
          standards by selecting from the map. Click on your country for
          detailed insights.
        </p>
      </div>

      <div className="sidebar-container">
        {items.map((item, index) => (
          <div key={index} className="sidebar-item active">
            <div className="circle">{index + 1}</div>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "16px", paddingTop: "20px" }}>
        Note: The highlighted countries represent the{" "}
        <span style={{ color: "#6366f1" }}>top refugee origins</span> in
        Australia.
      </p>
    </div>
  );
};

export const MapPage: React.FC<MapPageProps> = ({ onCountrySelect }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const renderMap = () => {
    if (!svgRef.current || !tooltipRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 700; // Reduced map size
    const height = 400; // Reduced map size

    const projection = d3
      .geoMercator()
      .scale(130)
      .translate([width / 2, height / 1.5]);
    const path = d3.geoPath().projection(projection);

    // Import and render the map
    import("@/assets/countries-110m.json").then((worldMapData) => {
      // eslint-disable-next-line
      const typedWorldMapData = worldMapData as any;
      const mapData = feature(
        typedWorldMapData,
        typedWorldMapData.objects.countries
        // eslint-disable-next-line
      ) as any as FeatureCollection<Geometry, GeoJsonProperties>;

      const tooltip = d3.select(tooltipRef.current);

      svg
        .append("g")
        .selectAll("path")
        .data(mapData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", (d) => {
          const countryName = d.properties?.name;
          // Highlight refugee countries with dark purple
          return highlightedCountries.includes(countryName)
            ? "#6366f1" // Dark Purple
            : "#D3D3D3"; // Default gray for other countries
        })
        .attr("stroke", "#ffffff")
        .on("mouseover", function (event, d) {
          const countryName = d.properties?.name;
          d3.select(this).attr("fill", "#6366f1");
          tooltip
            .style("opacity", 1)
            .style("left", `${event.pageX + 5}px`)
            .style("top", `${event.pageY - 28}px`)
            .text(countryName);
        })
        .on("mouseout", function (d) {
          const countryName = d.properties?.name;
          // Always keep refugee countries highlighted
          d3.select(this).attr(
            "fill",
            highlightedCountries.includes(countryName) ? "#6366f1" : "#D3D3D3"
          );
          tooltip.style("opacity", 0);
        })
        .on("click", function (_, d) {
          const countryId = String(d.id).padStart(3, "0");
          const countryName = d.properties?.name || null;
          onCountrySelect(countryId, countryName);
          tooltip.style("opacity", 0);
        });
    });
  };

  useEffect(() => {
    renderMap();

    // Clean up the tooltip and SVG on unmount
    return () => {
      d3.select(svgRef.current).selectAll("*").remove();
      d3.select(tooltipRef.current).style("opacity", 0);
    };
  }, []);

  return (
    <div
      style={{
        height: "80vh", // Reduced height to center map more
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CountrySearch onCountrySelect={onCountrySelect} />{" "}
      <div
        className="map-container"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingLeft: "20px",
          borderLeft: "1px solid #d3d3d3",
        }}
      >
        <NutritionMapInfo />
        <svg ref={svgRef} width={700} height={400}></svg>{" "}
        {/* Adjusted SVG size */}
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "5px",
            borderRadius: "4px",
            pointerEvents: "none",
            opacity: 0,
          }}
        ></div>
      </div>
    </div>
  );
};
