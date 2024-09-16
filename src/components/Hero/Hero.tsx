import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import vegetables from "../../../public/images/vegetables.png";
import help from "../../../public/images/help.png";
import "./Hero.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CarouselComponent = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselItems = [
    {
      id: 1,
      title: "Slide 1",
      image: "../../../public/images/vegetables.png",
      description: "This is the description for Slide 1",
    },
    {
      id: 2,
      title: "Slide 2",
      image: "../../../public/images/vegetables.png",
      description: "This is the description for Slide 2",
    },
    {
      id: 3,
      title: "Slide 3",
      image: "../../../public/images/vegetables.png",
      description: "This is the description for Slide 3",
    },
  ];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-slide-wrapper"
        style={{
          transform: `translateX(-${currentIndex * 96}%)`,
        }}
      >
        {Array.from({ length: 3 }, (_, i) => (
          <div className="carousel-slide">
            {i === 0 && (
              <div className="glass-card p-4 rounded-4">
                {/* Glass Card Container */}
                <div className="row align-items-center">
                  {/* Image */}
                  <div className="col-md-6 d-none d-md-block">
                    <img
                      src={vegetables}
                      alt="Vegetables"
                      className="img-fluid"
                      style={{
                        objectFit: "cover",
                        width: "500px",
                        height: "auto",
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
                      Explore nutritional map
                    </button>
                  </div>
                </div>
              </div>
            )}

            {i === 1 && (
              <div
                className="slide-content"
                style={{
                  backgroundImage: `url(${help})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  width: "98%",
                  borderRadius: "15px",
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
                    View more
                  </button>
                </div>
              </div>
            )}

            {i === 2 && (
              <div className="glass-card p-4 rounded-4">
                {/* Third Slide Content */}
                <div className="row align-items-center">
                  {/* You can customize this slide content */}
                  <div className="col-md-12 text-start">
                    <h1 className="display-4">Children Health Indicator</h1>
                    <p className="lead">Access your children health today</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="carousel-dots">
        {carouselItems.map((item, index) => (
          <span
            key={item.id}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
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
