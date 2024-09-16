import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Hero.css";

const CarouselComponent = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselItems = [
    {
      id: 1,
      title: "Slide 1",
      image: "/images/vegetables.png",
      description: "This is the description for Slide 1",
    },
    {
      id: 2,
      title: "Slide 2",
      image: "/images/vegetables.png",
      description: "This is the description for Slide 2",
    },
    {
      id: 3,
      title: "Slide 3",
      image: "/images/vegetables.png",
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
        {carouselItems.map((_, i) => (
          <div key={i} className="carousel-slide">
            {i === 0 && (
              <div className="glass-card p-4 rounded-4">
                <div className="row align-items-center">
                  <div className="col-md-6 d-none d-md-block">
                    <img
                      src="/images/vegetables.png"
                      alt="Vegetables"
                      className="img-fluid"
                      style={{
                        objectFit: "cover",
                        width: "500px",
                        height: "auto",
                      }}
                    />
                  </div>

                  <div className="col-md-5 text-start">
                    <h2 className="display-4" style={{ color: "black", fontWeight: "500" }}>
                      Nutrition Insights
                    </h2>
                    <p className="lead" style={{ fontWeight: "100", color: "#A4A4A4" }}>
                      Helping Refugee Families in Victoria Identify and Address Nutritional Gaps for a Healthier Future.
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
                  backgroundImage: `url(/images/help.png)`,
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
                <div className="row align-items-center">
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
  return (
    <section
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
