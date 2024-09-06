import React, { useState } from "react";
import "./Information.css";
import betterNutrition from "../../../public/BetterNutrition.pdf";

const Information: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    guideline1: false,
    guideline2: false,
    guideline3: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = betterNutrition;
    link.download = "Nutrition Bridge.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container my-5 pt-4">
      <main>
        <div className="content-center">
          <div className="hero-content">
            <h1>
              Essential Nutrition Guidelines <br />
              and Health Information
            </h1>
          </div>

          <section className="info">
            <div className="info-block">
              <h2>Nutrition Basics</h2>
              <p className="lead">
                Healthy eating is very important for your children. It helps
                them grow strong, stay active, and learn better. By offering a
                variety of good foods every day, you can help them stay healthy
                and happy. Let’s make healthy eating easy for your family!
              </p>
            </div>

            <div className="info-block">
              <h3
                onClick={() => toggleSection("guideline1")}
                className="expandable-title"
              >
                Australian Guidelines for Healthy Eating{" "}
                {expandedSections.guideline1 ? "−" : "+"}
              </h3>
              {expandedSections.guideline1 && (
                <div className="expandable-content">
                  <p className="lead">
                    <strong>Guideline 1:</strong> To stay at a healthy weight,
                    be active and eat the right amount of nutritious food and
                    drinks.
                  </p>
                  <p className="lead">
                    <strong>Guideline 2:</strong> Eat a variety of healthy foods
                    every day from these five groups:
                    <ul>
                      <li>
                        Vegetables: Different types and colours, including
                        beans.
                      </li>
                      <li>Fruits</li>
                      <li>
                        Grains: Whole Grain foods like bread, rice, pasta, and
                        oats.
                      </li>
                      <li>
                        Proteins: Lean meats, poultry, fish, eggs, tofu, nuts,
                        seeds, and beans.
                      </li>
                      <li>
                        Dairy: Milk, yoghurt, cheese, or alternatives, mostly
                        reduced-fat.
                      </li>
                    </ul>
                  </p>
                  <p className="lead">
                    <strong>Guideline 3:</strong> Limit foods with unhealthy
                    fats, added salt, sugars, and alcohol.
                  </p>
                  <p className="lead">
                    <em>Reference:</em> Official Australian Dietary Guidelines.
                    <a
                      href="https://www.eatforhealth.gov.au/sites/default/files/2022-09/n55a_australian_dietary_guidelines_summary_131014_1.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      Read more <span style={{ color: "#6366f1" }}>here</span>.
                    </a>
                  </p>
                </div>
              )}
            </div>

            <div className="info-block">
              <h3
                onClick={() => toggleSection("guideline2")}
                className="expandable-title"
              >
                Key Contact Information for Food Support{" "}
                {expandedSections.guideline2 ? "−" : "+"}
              </h3>
              {expandedSections.guideline2 && (
                <div className="expandable-content">
                  <p className="lead">
                    <strong>Friends of Refugees</strong>
                    <br />
                    Address: 1D Parsons Avenue, Springvale, VIC 3171
                  </p>
                  <p className="lead">
                    <strong>
                      Asylum Seeker Resource Centre (ASRC) Foodbank and
                      Community Kitchen
                    </strong>
                    <br />
                    Address: 214-218 Nicholson St, Footscray VIC 3011
                  </p>
                  <p className="lead">
                    <strong>Victorian Refugee Health Network</strong>
                    <br />
                    <a
                      href="https://refugeehealthnetwork.org.au/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit website:
                      <span style={{ color: "#6366f1" }}>
                        https://refugeehealthnetwork.org.au/
                      </span>
                    </a>
                  </p>
                </div>
              )}
            </div>
          </section>

          <div className="download-content">
            <div className="download-overlay"></div>
            <div className="download-content-text text-start">
              <h2>
                Download a Concise Page
                <br />
                of Health Information
              </h2>
            </div>
            <div className="button-container">
              <button
                className="btn btn-custom btn-primary"
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Information;
