import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import refugees from "../../../public/images/refugees.png";
import cause from "../../../public/images/cause.png";
import solution from "../../../public/images/solution.png";
import "./AwarenessSection.css";

// import { useTranslation } from "react-i18next";
type SectionType = "challenge" | "cause" | "solution";

function AwarenessSection() {
  const [activeSection, setActiveSection] = useState<SectionType>("challenge");

  const handleSectionClick = (section: SectionType) => {
    setActiveSection(section);
  };
  // const { t } = useTranslation();

  const sectionContent = {
    challenge: {
      title: "Awareness Gap",
      subtitle:
        "Many refugee families arriving in Victoria come from conflict zones where survival was the priority, with little focus on health and well-being. As they settle into safety, they often lack awareness about the importance of nutrition and health for their children.",
      image: refugees,
    },
    cause: {
      title: "Lack of Information",
      subtitle:
        "The lack of awareness and access to nutritional information often stems from the challenging environments that refugee families come from. Without proper education and resources, understanding the importance of a balanced diet becomes difficult.",
      image: cause,
    },
    solution: {
      title: "Nutrition Bridge",
      subtitle:
        "To bridge this gap, we are here to provide educational resources tailored to refugee communities can empower them to make informed decisions about their nutrition and health.",
      image: solution,
    },
  };

  const { title, subtitle, image } = sectionContent[activeSection];

  return (
    <div className="awareness-section">
      {/* Awareness Section */}
      <section className="py-3">
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
              <p className="lead">The {activeSection}</p>
              <h4
                className="display-4"
                style={{ color: "black", fontWeight: "500" }}
              >
                {title}
              </h4>
              <div className="pr-8">
                <p className="lead" style={{ color: "#71717A" }}>
                  {subtitle}
                </p>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="col-md-5">
              <img
                src={image}
                alt={title}
                className="img-fluid rounded fixed-size"
              />
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
              backgroundColor: "#EAEBFF",
            }}
          >
            <div
              className="slider-progress position-absolute"
              style={{
                width: "33%",
                height: "4px",
                transition: "left 0.4s ease",
                borderRadius: "10px",
                backgroundColor: "#6366F1",
                left:
                  activeSection === "challenge"
                    ? "0%"
                    : activeSection === "cause"
                    ? "33%"
                    : "67%",
              }}
            />
          </div>
        </div>

        {/* Slider Content */}
        <div className="row">
          {/* The challenge */}
          <div className="col-md-4 text-start">
            <div
              className="pr-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleSectionClick("challenge")}
            >
              <h5>The Challenge</h5>
              <p
                className="lead"
                style={{
                  color: activeSection === "challenge" ? "#71717A" : "#C4C4C4",
                  fontSize: "16px",
                }}
              >
                Face an awareness gap regarding <br />
                the importance of nutrition for their children.
              </p>
            </div>
          </div>

          {/* The Cause */}
          <div className="col-md-4 text-start">
            <div
              className="pr-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleSectionClick("cause")}
            >
              <h5>The Cause</h5>
              <p
                className="lead"
                style={{
                  color: activeSection === "cause" ? "#71717A" : "#C4C4C4",
                  fontSize: "16px",
                }}
              >
                Lack awareness to nutritional information <br />
                due to their challenging backgrounds.
              </p>
            </div>
          </div>

          {/* The Solution */}
          <div className="col-md-4 text-start">
            <div
              className="pr-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleSectionClick("solution")}
            >
              <h5>The Solution</h5>
              <p
                className="lead"
                style={{
                  color: activeSection === "solution" ? "#71717A" : "#C4C4C4",
                  fontSize: "16px",
                }}
              >
                Empower refugee communities make <br />
                informed nutrition and health decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AwarenessSection;
