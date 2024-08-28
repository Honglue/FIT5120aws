import React from "react";
import "./Information.css";
import help from "../../public/images/help.png";

const Information: React.FC = () => {
  return (
    <div className="container my-5 pt-4">
      <main>
        <section className="hero">
          <div className="hero-image-container">
            <img src={help} alt="Hands" className="hero-image" />
            <div className="dark-overlay"></div>
          </div>

          <div className="hero-content">
            <h1>Essential Information</h1>
            <button
              className="download-button"
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                borderColor: "#6366F1",
                borderRadius: "25px",
              }}
              onClick={() => {}}
            >
              Download
            </button>
          </div>
        </section>

        <section className="info">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="info-block">
                <h2>Awareness Gap</h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </p>
                <a href="#" className="info-link">
                  A resource for Refugee families for a healthier lifestyle
                </a>
              </div>
            ))}
        </section>
      </main>
    </div>
  );
};

export default Information;
