import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../public/images/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid #e0e0e0",
        padding: "10px",
        zIndex: 1000,
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Better Nutrition"
            width="24"
            height="30"
            className="d-inline-block align-top"
          />
          <span style={{ paddingLeft: "10px" }}>Better Nutrition</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-3">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
                style={{
                  color: location.pathname === "/" ? "#6366F1" : "inherit",
                }}
              >
                Home
              </Link>
            </li>

            <li className="nav-item me-3">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
                style={{
                  color: location.pathname === "/about" ? "#6366F1" : "inherit",
                }}
              >
                More Info
              </Link>
            </li>

            <li className="nav-item">
              <button
                className={`btn ${
                  location.pathname === "/nutrition-map" ? "active" : ""
                }`}
                style={{
                  backgroundColor: "#6366F1",
                  color: "white",
                  padding: "8px 15px",
                }}
                onClick={() => navigate("/nutrition-map")}
              >
                Nutrition Map
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
