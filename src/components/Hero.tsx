import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import vegetables from "../../public/images/vegetables.png";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="hero-section d-flex align-items-center"
      style={{ minHeight: "80vh" }}
      // backgroundColor: "#ECFDF5"
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Image */}
          <div className="col-md-6 d-none d-md-block">
            <img
              src={vegetables}
              alt="Vegetables"
              className="img-fluid"
              style={{ objectFit: "cover", width: "auto", height: "auto" }}
            />
          </div>

          {/* Text and Button */}
          <div className="col-md-6 text-start">
            <h1
              className="display-4 "
              style={{ color: "black", fontWeight: "400" }}
            >
              Better Nutrition
            </h1>
            <p className="lead" style={{ color: "#606060" }}>
              Empowering Refugee Families to Foster Healthier Lives for Their
              Children
            </p>
            <button
              className="btn btn-custom btn-primary"
              style={{
                padding: "10px 20px",
                borderColor: "#6366F1",
                borderRadius: "25px",
              }}
              onClick={() => navigate("/details")}
            >
              Explore Map
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
