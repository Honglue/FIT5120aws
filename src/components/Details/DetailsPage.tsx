import "bootstrap/dist/css/bootstrap.min.css";
import "./DetailsPage.css";
import { useNavigate } from "react-router-dom";
import earth from "../../../public/images/earth-icon.png";
import info from "../../../public/images/info-icon.png";
import indicator from "../../../public/images/indicator-icon.png";

function DetailsPage() {
  const navigate = useNavigate();

  return (
    <div
      className="container d-flex flex-column justify-content-center text-center my-3 flex-grow-1"
      style={{ minHeight: "85vh" }}
    >
      {/* Header Section */}
      <header className="mb-5">
        <h1 style={{ fontWeight: "500" }}>A platform to Empower You</h1>
        <p className="lead" style={{ color: "" }}>
          We are here to empower refugee families with the necessary tools. Here
          is how.
        </p>
      </header>

      {/* Card Container */}
      <div className="row justify-content-center">
        <div className="col-md-3 m-3">
          <div
            className="card card-custom text-dark h-100"
            style={{
              border: "none",
              minHeight: "100px",
              textAlign: "left",
              cursor: "pointer",
              padding: "20px",
            }}
            onClick={() => navigate("/nutrition-map")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              {/* Icon or Image */}
              <img
                src={earth}
                alt="earth"
                className="img-fluid mb-3"
                style={{ width: "80px", height: "80px" }}
              />

              {/* Title */}
              <div style={{ paddingTop: "20px" }}>
                <h5 className="card-title mb-2" style={{ fontWeight: "500" }}>
                  Nutrition Mapping Tool
                </h5>

                {/* Description */}
                <p className="lead card-text" style={{ fontSize: "16px" }}>
                  Check nutrition deficiencies from your origin country
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 m-3">
          <div
            className="card card-custom text-dark h-100"
            style={{
              border: "none",
              minHeight: "300px",
              textAlign: "left",
              cursor: "pointer",
              padding: "20px",
            }}
            onClick={() => navigate("/nutrition-map")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              {/* Icon or Image */}
              <img
                src={info}
                alt="info"
                className="img-fluid mb-3"
                style={{ width: "80px", height: "80px" }}
              />

              <div style={{ paddingTop: "20px" }}>
                {/* Title */}
                <h5 className="card-title mb-2" style={{ fontWeight: "500" }}>
                  Nutrion Information
                </h5>

                {/* Description */}
                <p
                  className="card-text text-muted"
                  style={{ fontSize: "16px" }}
                >
                  Access important health-related info and support resources
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 m-3">
          <div
            className="card card-custom text-dark h-100"
            style={{
              border: "none",
              minHeight: "300px",
              textAlign: "left",
              cursor: "pointer",
              padding: "20px",
            }}
            onClick={() => navigate("/recommend")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              {/* Icon or Image */}
              <img
                src={indicator}
                alt="indicator"
                className="img-fluid mb-3"
                style={{ width: "80px", height: "80px" }}
              />

              <div style={{ paddingTop: "20px" }}>
                {/* Title */}
                <h5 className="card-title mb-2" style={{ fontWeight: "500" }}>
                  Nutrition Indicator
                </h5>

                {/* Description */}
                <p
                  className="card-text text-muted"
                  style={{ fontSize: "16px" }}
                >
                  Find out how to improve your children's nutrition
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
