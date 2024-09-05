import "bootstrap/dist/css/bootstrap.min.css";
import "./DetailsPage.css";
import { useNavigate } from "react-router-dom";

function DetailsPage() {
  const navigate = useNavigate();

  return (
    <div
      className="container d-flex flex-column justify-content-center text-center my-5 flex-grow-1"
      style={{ minHeight: "85vh" }}
    >
      {/* Header Section */}
      <header className="mb-5">
        <h1>A platform to Empower You</h1>
        <p className="lead" style={{ color: "" }}>
          We are here to empower refugee families with the necessary tools. Here
          is how.
        </p>
      </header>

      {/* Card Container */}
      <div className="row justify-content-center">
        <div className="col-md-3 mb-4">
          <div
            className="card text-dark h-100 card-hover"
            style={{ minHeight: "300px", textAlign: "left" }}
            onClick={() => navigate("/nutrition-map")}
          >
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Nutrition Mapping Tool</h5>
              <p className="card-text mt-auto" style={{ color: "#" }}>
                Check nutrition deficiencies from your country of origin and
                compare them to healthy standards.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div
            className="card text-dark h-100 d-flex card-hover"
            style={{ minHeight: "300px", textAlign: "left" }}
            onClick={() => navigate("/information")}
          >
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Health Information</h5>
              <p className="card-text mt-auto" style={{ color: "#" }}>
                Access important health-related info and support resources.
              </p>
            </div>
          </div>
        </div>

        {/* Updated Card for Health Metrics Analyser */}
        <div className="col-md-3 mb-4">
          <div
            className="card h-100 d-flex card-hover"
            style={{
              minHeight: "300px",
              textAlign: "left",
            }}
            onClick={() => navigate("/recommend")} /* Navigate to Recommend page */
          >
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Health Metrics Analyser</h5>
              <p className="card-text mt-auto" style={{ color: "#" }}>
                Input metrics to compare children's growth against standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
