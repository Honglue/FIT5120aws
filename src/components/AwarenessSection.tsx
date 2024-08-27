import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import refugees from "../../public/images/refugees.png"; // Correct path to the image

// Define the type for the section names
type SectionType = "problem" | "cause" | "solution";

function AwarenessSection() {
  const [activeSection, setActiveSection] = useState<SectionType>("problem");

  const handleSectionClick = (section: SectionType) => {
    setActiveSection(section);
  };

  // Content that changes based on the active section
  const sectionContent = {
    problem: {
      title: "Awareness Gap",
      subtitle:
        "Many refugee families arriving in Victoria come from conflict-ridden backgrounds where survival was their primary focus, leaving little room for considerations of health and well-being, particularly for their children. As they settle into a safer environment, they often face an awareness gap regarding the importance of nutrition and overall health for their children.",
      image: refugees,
    },
    cause: {
      title: "The Cause",
      subtitle:
        "The lack of awareness and access to nutritional information often stems from the challenging environments that refugee families come from. Without proper education and resources, understanding the importance of a balanced diet becomes difficult.",
      image: refugees,
    },
    solution: {
      title: "The Solution",
      subtitle:
        "To bridge this gap, providing educational programs and resources tailored to refugee communities can empower them to make informed decisions about their nutrition and health.",
      image: refugees,
    },
  };

  const { title, subtitle, image } = sectionContent[activeSection];

  return (
    <>
      {/* Awareness Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Column: Text */}
            <div className="col-md-7 text-start">
              {/* Subheading with lighter font weight and lighter color */}
              <p className="text-uppercase fw-normal text-secondary mb-2">
                The {activeSection}.
              </p>
              {/* Title with black color and bold weight */}
              <h4
                className="display-4"
                style={{ color: "black", fontWeight: "700" }}
              >
                {title}
              </h4>
              {/* Subtitle with lighter color and aligned to the left */}
              <p className="lead" style={{ color: "#606060" }}>
                {subtitle}
              </p>
            </div>
            {/* Right Column: Image */}
            <div className="col-md-5">
              <img src={image} alt={title} className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="py-5">
        <div className="container">
          {/* Top Slider Bar */}
          <div className="d-flex align-items-center mb-4">
            <div
              className="slider-bar bg-light position-relative"
              style={{
                width: "100%",
                height: "4px",
                marginRight: "10px",
                borderRadius: "10px",
                backgroundColor: "#e0e0e0",
              }}
            >
              <div
                className="slider-progress bg-primary position-absolute"
                style={{
                  width:
                    activeSection === "problem"
                      ? "33%"
                      : activeSection === "cause"
                      ? "66%"
                      : "100%",
                  height: "4px",
                  transition: "width 0.4s ease",
                  borderRadius: "10px",
                  backgroundColor: "#6366F1",
                }}
              ></div>
            </div>
          </div>

          {/* Slider Content */}
          <div className="row text-center">
            {/* The problem */}
            <div className="col-md-4">
              <div
                className={`p-3 ${
                  activeSection === "problem"
                    ? "fw-bold text-dark"
                    : "text-muted"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handleSectionClick("problem")}
              >
                <h5>The problem</h5>
                {activeSection === "problem" && (
                  <p className="mt-2">
                    Refugee families face an awareness gap regarding the
                    importance of nutrition for their children.
                  </p>
                )}
              </div>
            </div>
            {/* The Cause */}
            <div className="col-md-4">
              <div
                className={`p-3 ${
                  activeSection === "cause" ? "fw-bold text-dark" : "text-muted"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handleSectionClick("cause")}
              >
                <h5>The Cause</h5>
                {activeSection === "cause" && (
                  <p className="mt-2">
                    The point of using Lorem Ipsum is that it has a more-or-less
                    normal distribution of letters.
                  </p>
                )}
              </div>
            </div>
            {/* The Solution */}
            <div className="col-md-4">
              <div
                className={`p-3 ${
                  activeSection === "solution"
                    ? "fw-bold text-dark"
                    : "text-muted"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handleSectionClick("solution")}
              >
                <h5>The Solution</h5>
                {activeSection === "solution" && (
                  <p className="mt-2">
                    The point of using Lorem Ipsum is that it has a more-or-less
                    normal distribution of letters.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AwarenessSection;
