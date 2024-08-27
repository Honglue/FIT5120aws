import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import vegetables from "../../public/images/vegetables.png";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero-section py-5 bg-white">
      <div className="container">
        <div className="row align-items-center">
          {/* Image */}
          <div className="col-md-6 d-none d-md-block">
            <img
              src={vegetables}
              alt="Vegetables"
              className="img-fluid"
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </div>

          {/* Text and Button */}
          <div className="col-md-6 text-start">
            <h1 className="display-4 fw-bold">Better Nutrition</h1>
            <p className="lead" style={{ color: "#606060" }}>
              Empowering Refugee Families to Foster Healthier Lives for Their
              Children
            </p>
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: "#6366F1",
                borderColor: "#6366F1",
                borderRadius: "20px",
              }}
              onClick={() => navigate("/details")}
            >
              Explore Nutrition Map
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
