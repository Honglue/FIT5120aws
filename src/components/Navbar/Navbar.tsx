import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../public/images/logo.jpg";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();
  const { t } = useTranslation();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      // Navbar will disappear if scrolling down, reappear when scrolling up
      setIsVisible(scrollPosition > currentScrollPos || currentScrollPos < 300);
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPosition]);

  return (
    <nav
      className="navbar navbar-expand-lg  fixed-top"
      style={{
        backgroundColor: "rgba(250, 250, 250, 0.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        padding: "10px",
        marginRight: "20px",
        zIndex: 1000,
        top: isVisible ? "0" : "-80px",
        transition: "top 0.3s ease-in-out",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Nutrition Bridge"
            width="24"
            height="30"
            className="d-inline-block align-top"
          />
          <span style={{ paddingLeft: "10px", fontSize: "16px" }}>
            {t("Nutrition Bridge")}
          </span>
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
            {/* Identify Gaps Dropdown */}
            <li className="nav-item dropdown" style={{ marginRight: "40px" }}>
              <Link
                className={`nav-link dropdown-toggle ${
                  location.pathname === "/" ||
                  location.pathname === "/nutrition-map" ||
                  location.pathname === "/recommend"
                    ? "active"
                    : ""
                }`}
                to="#"
                id="identifyGapsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ fontSize: "15px" }}
              >
                {t("Identify Gaps")}
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="identifyGapsDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/nutrition-map">
                    Nutrition Map
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/recommend">
                    Nutrition Indicator
                  </Link>
                </li>
              </ul>
            </li>

            {/* Education Dropdown */}
            <li className="nav-item dropdown" style={{ marginRight: "40px" }}>
              <Link
                className={`nav-link dropdown-toggle ${
                  location.pathname === "/information" ||
                  location.pathname === "/quiz"
                    ? "active"
                    : ""
                }`}
                to="#"
                id="educationDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ fontSize: "15px" }}
              >
                {t("Education")}
              </Link>
              <ul className="dropdown-menu" aria-labelledby="educationDropdown">
                <li>
                  <Link className="dropdown-item" to="/information">
                    Nutrition Info
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/quiz">
                    Nutrition Quiz
                  </Link>
                </li>
              </ul>
            </li>

            {/* Recommendations Dropdown */}
            <li className="nav-item dropdown me-4">
              <Link
                className={`nav-link dropdown-toggle ${
                  location.pathname === "/recommendations" ? "active" : ""
                }`}
                to="#"
                id="recommendationDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ fontSize: "15px" }}
              >
                {t("Recommendations")}
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="recommendationDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/recommendations">
                    Dish Recommender
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
