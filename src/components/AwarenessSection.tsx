import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import refugees from "../../public/images/refugees.png";

type SectionType = "problem" | "cause" | "solution";

function AwarenessSection() {
  const [activeSection, setActiveSection] = useState<SectionType>("problem");

  const handleSectionClick = (section: SectionType) => {
    setActiveSection(section);
  };

  const sectionContent = {
    problem: {
      title: "Awareness Gap",
      subtitle:
        "Many refugee families arriving in Victoria come from conflict zones where survival was the priority, with little focus on health and well-being. As they settle into safety, they often lack awareness about the importance of nutrition and health for their children.",
      image: refugees,
    },
    cause: {
      title: "Lack of Information",
      subtitle:
        "The lack of awareness and access to nutritional information often stems from the challenging environments that refugee families come from. Without proper education and resources, understanding the importance of a balanced diet becomes difficult.",
      image: refugees,
    },
    solution: {
      title: "Better Nutrition",
      subtitle:
        "To bridge this gap, we are here to provide educational resources tailored to refugee communities can empower them to make informed decisions about their nutrition and health.",
      image: refugees,
    },
  };

  const { title, subtitle, image } = sectionContent[activeSection];

  return (
    <div>
      {/* Awareness Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Column: Text */}
            <div
              className="col-md-7 text-start"
              style={{
                paddingRight: "40px",
                transition: "all 0.4s ease",
                height: "250px",
              }}
            >
              {/* Subheading with lighter font weight and lighter color */}
              <p className="text-uppercase fw-normal">The {activeSection}</p>
              <h4
                className="display-4"
                style={{ color: "black", fontWeight: "400" }}
              >
                {title}
              </h4>
              <div className="pr-8">
                <p className="lead" style={{ color: "#606060" }}>
                  {subtitle}
                </p>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="col-md-5">
              <img src={image} alt={title} className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <div className="container">
        {/* Top Slider Bar */}
        <div className="d-flex align-items-center mb-4">
          <div
            className="slider-bar  position-relative"
            style={{
              width: "100%",
              height: "4px",
              marginRight: "10px",
              borderRadius: "10px",
              backgroundColor: "#F4F6F8",
            }}
          >
            <div
              className="slider-progress position-absolute"
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
        <div className="row text-center ">
          {/* The problem */}
          <div className="col-md-4 text-start">
            <div
              className="p-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleSectionClick("problem")}
            >
              <h5>The problem</h5>
              <p
                className="mt-2"
                style={{
                  color: activeSection === "problem" ? "#606060" : "#C4C4C4",
                }}
              >
                Face an awareness gap regarding the importance of nutrition for
                their children.
              </p>
            </div>
          </div>

          {/* The Cause */}
          <div className="col-md-4 text-start">
            <div
              className="p-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleSectionClick("cause")}
            >
              <h5>The Cause</h5>
              <p
                className="mt-2"
                style={{
                  color: activeSection === "cause" ? "#606060" : "#C4C4C4",
                }}
              >
                Lack awareness to nutritional information due to their
                challenging backgrounds.
              </p>
            </div>
          </div>

          {/* The Solution */}
          <div className="col-md-4 text-start">
            <div
              className="p-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleSectionClick("solution")}
            >
              <h5>The Solution</h5>
              <p
                className="mt-2"
                style={{
                  color: activeSection === "solution" ? "#606060" : "#C4C4C4",
                }}
              >
                Empower refugee communities make informed nutrition and health
                decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AwarenessSection;
