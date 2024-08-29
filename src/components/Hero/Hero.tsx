import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import vegetables from "../../../public/images/vegetables.png";
import "./Hero.css"; // Ensure this file contains the CSS for glass effect

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="hero-section d-flex align-items-center justify-content-center pt-4"
      style={{ minHeight: "85vh" }}
    >
      <div
        id="heroCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="container">
          <div className="glass-card p-4 rounded-4">
            {/* Glass Card Container */}
            <div className="row align-items-center">
              {/* Image */}
              <div className="col-md-6 d-none d-md-block">
                <img
                  src={vegetables}
                  alt="Vegetables"
                  className="img-fluid"
                  style={{ objectFit: "cover", width: "500px", height: "auto" }}
                />
              </div>

              {/* Text and Button */}
              <div className="col-md-5 text-start">
                <h1
                  className="display-4"
                  style={{ color: "black", fontWeight: "400" }}
                >
                  Nutrition Insights
                </h1>
                <p
                  className="lead"
                  style={{ fontWeight: "100", color: "#A4A4A4" }}
                >
                  Helping Refugee Families Identify and Address Nutritional Gaps
                  for a Healthier Future
                </p>
                <button
                  className="btn btn-custom btn-primary"
                  style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    borderColor: "#6366F1",
                    borderRadius: "25px",
                  }}
                  onClick={() => navigate("/nutrition-map")}
                >
                  Explore Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
