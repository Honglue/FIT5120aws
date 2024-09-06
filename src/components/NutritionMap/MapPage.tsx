import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

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

export const MapPage: React.FC<MapPageProps> = ({ onCountrySelect }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // Function to initialize and draw the map using D3
  const renderMap = () => {
    if (!svgRef.current || !tooltipRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 500;

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
          return highlightedCountries.includes(countryName)
            ? "#A3A6F9"
            : "#D3D3D3";
        })
        .attr("stroke", "#ffffff")
        .on("mouseover", function (event, d) {
          const countryName = d.properties?.name;
          tooltip
            .style("opacity", 1)
            .style("left", `${event.pageX + 5}px`)
            .style("top", `${event.pageY - 28}px`)
            .text(countryName);
        })
        .on("mouseout", () => {
          tooltip.style("opacity", 0);
        })
        .on("click", function (_, d) {
          const countryId = String(d.id).padStart(3, "0");
          const countryName = d.properties?.name || null;
          onCountrySelect(countryId, countryName); // Notify the parent component when a country is selected
          tooltip.style("opacity", 0); // Hide tooltip after selecting a country
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

  const NutritionMapInfo = () => (
    <div
      className="pt-4"
      style={{
        maxWidth: "350px",
        margin: "0 auto",
        textAlign: "left",
        padding: "20px",
        border: "1px solid #d3d3d3",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ fontWeight: "bold", marginBottom: "10px" }}>
        Nutritional Map
      </h2>
      <p className="lead" style={{ fontSize: "16px" }}>
        Use our interactive map to discover the nutrients patterns in your
        country. Click on your home country to see detailed insights,
        highlighting which foods are beneficial and which to limit.
      </p>

      <p className="lead" style={{ fontSize: "16px" }}>
        <br />
        <strong>How it works:</strong> <br />
        1. Select a country from the map above. <br />
        Note: The highlighted countries represent the top countries of origin
        for refugees in Australia.
        <br />
        <br />
        2. The nutrition level of each nutrient will be displayed, comparing it
        against the Australia average.
      </p>
    </div>
  );

  return (
    <div
      className="map-container"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "left",
        padding: "40px",
      }}
    >
      <NutritionMapInfo />

      <svg ref={svgRef} width={900} height={500}></svg>
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
  );
};
