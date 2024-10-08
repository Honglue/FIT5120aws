import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import vegetables from "../../../public/images/vegetables.jpg";
import help from "../../../public/images/help.jpg";
import cooking from "../../../public/images/cooking.jpg";
import refugee from "../../../public/images/hero-refugee.jpg";
import veg from "../../../public/images/hero-veges.jpg";

import "./Hero.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CarouselComponent = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goNext = () => {
    if (currentIndex < 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: "relative" }}
    >
      <div
        className="carousel-slide-wrapper"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {Array.from({ length: 4 }, (_, i) => (
          <div className="carousel-slide">
            {i === 0 && (
              <div
                className="slide-content rounded-2"
                style={{
                  backgroundImage: `url(${refugee})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  width: "98%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  textAlign: "left",
                  position: "relative",
                  overflow: "hidden",
                  padding: "20px",
                }}
              >
                {/* Overlay div */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    zIndex: 0,
                  }}
                ></div>

                {/* Content div */}
                <div
                  style={{
                    color: "white",
                    zIndex: 1,
                    position: "relative",
                    padding: "100px",
                    alignSelf: "flex-start",
                  }}
                >
                  <h1>We are Nutrition Bridge.</h1>
                  <h3 className="lead" style={{ color: "white" }}>
                    Our mission is to empower refugee families with
                    <br />
                    the tools to improve their children's nutrition.
                  </h3>
                </div>

                {/* Button div (Centered) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                  }}
                >
                  <button
                    className="btn btn-custom btn-primary"
                    style={{
                      padding: "10px 25px",
                      borderRadius: "30px",
                    }}
                    onClick={goNext}
                  >
                    Explore Features
                  </button>
                </div>
              </div>
            )}

            {i === 1 && (
              <div className="glass-card rounded-2">
                {/* Glass Card Container */}
                <div className="row align-items-center">
                  {/* Image */}
                  <div className="col-md-6 d-none d-md-block">
                    <img
                      src={veg}
                      alt="Vegetables"
                      className="img-fluid"
                      style={{
                        borderRadius: "10px",
                        objectFit: "cover",
                        width: "500px",
                        height: "300px",
                      }}
                    />
                  </div>

                  {/* Text and Button */}
                  <div className="col-md-5 text-start">
                    <h2
                      className="display-4"
                      style={{ color: "black", fontWeight: "500" }}
                    >
                      Nutrition Insights
                    </h2>
                    <p
                      className="lead"
                      style={{ fontWeight: "100", color: "#A4A4A4" }}
                    >
                      Helping Refugee Families in Victoria Identify and Address
                      Nutritional Gaps for a Healthier Future.
                    </p>
                    <button
                      className="btn btn-custom btn-primary"
                      style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        borderRadius: "25px",
                      }}
                      onClick={() => navigate("/nutrition-map")}
                    >
                      Explore Nutritional Map
                    </button>
                  </div>
                </div>
              </div>
            )}

            {i === 2 && (
              <div
                className="slide-content rounded-2"
                style={{
                  backgroundImage: `url(${help})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  width: "98%",
                  // borderRadius: "15px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  textAlign: "left",
                  position: "relative",
                  overflow: "hidden",
                  padding: "20px",
                }}
              >
                {/* Overlay div */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    zIndex: 0,
                  }}
                ></div>

                {/* Content div */}
                <div
                  style={{
                    color: "white",
                    zIndex: 1,
                    position: "relative",
                    padding: "100px",
                    alignSelf: "flex-start",
                  }}
                >
                  <h1>
                    Essential Nutrition Guidelines in Victoria
                    <br />
                    That You Need to Know
                  </h1>
                </div>

                {/* Button div (Centered) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                  }}
                >
                  <button
                    className="btn btn-custom btn-primary"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "25px",
                    }}
                    onClick={() => navigate("/information")}
                  >
                    Explore Information
                  </button>
                </div>
              </div>
            )}

            {i === 3 && (
              <div
                className="slide-content rounded-2"
                style={{
                  backgroundImage: `url(${cooking})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  width: "98%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  textAlign: "left",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Overlay div */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    zIndex: 0,
                  }}
                ></div>

                {/* Content div */}
                <div
                  style={{
                    color: "white",
                    zIndex: 1,
                    position: "relative",
                    padding: "100px",
                    alignSelf: "flex-start",
                  }}
                >
                  <h1>Assess your children's health today</h1>
                  <h3 className="lead" style={{ color: "white" }}>
                    Our indicator offers valuable insights into your child's
                    well-being <br />
                    and provides personalized recommendations for improvement.
                  </h3>
                </div>

                {/* Button div (Centered) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                  }}
                >
                  <button
                    className="btn btn-custom btn-primary"
                    style={{
                      padding: "10px 25px",
                      borderRadius: "30px",
                    }}
                    onClick={() => navigate("/indicator")}
                  >
                    Explore Indicator
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {isHovered && currentIndex !== 0 && (
        <button
          className={`carousel-button prev ${isHovered ? "show" : ""}`}
          onClick={goPrev}
        >
          &#8249;
        </button>
      )}

      {isHovered && currentIndex !== 3 && (
        <button
          className={`carousel-button next ${isHovered ? "show" : ""}`}
          onClick={goNext}
        >
          &#8250;
        </button>
      )}

      {/* Navigation Dots */}
      <div className="carousel-dots">
        {Array.from({ length: 4 }, (_, i) => (
          <span
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

function Hero() {
  // const navigate = useNavigate();

  return (
    <section
      // className="hero-section d-flex align-items-center justify-content-center pt-4"
      className="hero-section d-flex align-items-center justify-content-center pt-2"
      style={{ minHeight: "85vh" }}
    >
      <div
        id="heroCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <CarouselComponent />
      </div>
    </section>
  );
}

export default Hero;
