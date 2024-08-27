import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../public/images/logo.png";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light border-bottom"
      style={{ borderBottomColor: "#e0e0e0", padding: "10px" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Better Nutrition"
            width="25"
            height="30"
            className="d-inline-block align-top"
          />
          Better Nutrition
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
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item me-3">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="btn"
                style={{ backgroundColor: "#6366F1", color: "white" }}
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
