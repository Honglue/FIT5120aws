import "bootstrap/dist/css/bootstrap.min.css";
import "./DetailsPage.css";
import { useNavigate } from "react-router-dom";
import earth from "../../../public/images/earth-icon.jpg";
import info from "../../../public/images/info-icon.jpg";
import indicator from "../../../public/images/indicator-icon.jpg";

function DetailsPage() {
  const navigate = useNavigate();

  return (
    <div
      className="container d-flex flex-column justify-content-center text-center my-3 flex-grow-1"
      style={{ minHeight: "85vh" }}
    >
      {/* Header Section */}
      <header className="mb-5">
        <h2 style={{ fontWeight: "500" }}>A platform to Empower You</h2>
        <p className="lead" style={{ fontSize: "18px" }}>
          We are here to empower refugee families with the necessary tools. Here
          is how.
        </p>
      </header>

      {/* First Row: 3 Cards */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-3 mx-2">
          <div
            className="card card-custom text-dark h-100"
            style={{
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              padding: "20px",
            }}
            onClick={() => navigate("/nutrition-map")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <img
                src={earth}
                alt="earth"
                className="img-fluid mb-3"
                style={{ width: "70px", height: "70px" }}
              />
              <div>
                <h5 className="card-title mb-2" style={{ fontWeight: "500" }}>
                  Nutrition Map
                </h5>
                <p
                  className="card-text text-muted"
                  style={{ fontSize: "14px" }}
                >
                  Check nutrition deficiencies from your origin country
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mx-2">
          <div
            className="card card-custom text-dark h-100"
            style={{
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              padding: "20px",
            }}
            onClick={() => navigate("/information")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <img
                src={info}
                alt="info"
                className="img-fluid mb-3"
                style={{ width: "70px", height: "70px" }}
              />
              <div>
                <h5 className="card-title mb-2" style={{ fontWeight: "500" }}>
                  Nutrition Indicator
                </h5>
                <p
                  className="card-text text-muted"
                  style={{ fontSize: "14px" }}
                >
                  Access important health-related info and support resources
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mx-2">
          <div
            className="card card-custom text-dark h-100"
            style={{
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              padding: "20px",
            }}
            onClick={() => navigate("/recommend")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <img
                src={indicator}
                alt="indicator"
                className="img-fluid mb-3"
                style={{ width: "70px", height: "70px" }}
              />
              <div>
                <h5 className="card-title mb-2" style={{ fontWeight: "500" }}>
                  Dish Recommender
                </h5>
                <p
                  className="card-text text-muted"
                  style={{ fontSize: "14px" }}
                >
                  Find out how to improve your children's nutrition
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row: 2 Cards */}
      <div className="row justify-content-center">
        <div className="col-md-3 mx-2">
          <div
            className="card card-custom text-dark h-100"
            style={{
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              padding: "20px",
            }}
            onClick={() => navigate("/recommend")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <img
                src={indicator}
                alt="indicator"
                className="img-fluid mb-3"
                style={{ width: "70px", height: "70px" }}
              />
              <div>
                <h5 className="card-title mb-2" style={{ fontWeight: "500" }}>
                  Nutrition Info
                </h5>
                <p
                  className="card-text text-muted"
                  style={{ fontSize: "14px" }}
                >
                  Access important health-related info and support resources
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mx-2">
          <div
            className="card card-custom text-dark h-100"
            style={{
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              padding: "20px",
            }}
            onClick={() => navigate("/recommend")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <img
                src={indicator}
                alt="indicator"
                className="img-fluid mb-3"
                style={{ width: "70px", height: "70px" }}
              />
              <div>
                <h5 className="card-title mb-2" style={{ fontWeight: "500" }}>
                  Nutrition Quiz
                </h5>
                <p
                  className="card-text text-muted"
                  style={{ fontSize: "14px" }}
                >
                  Assess your nutrition knowledge to learn more
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
