import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../public/images/logo.png";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        padding: "10px",
        zIndex: 1000,
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
          <span style={{ paddingLeft: "10px" }}>{t("Nutrition Bridge")}</span>
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
                {t("home")}
              </Link>
            </li>

            <li className="nav-item me-3">
              <Link
                className={`nav-link ${
                  location.pathname === "/information" ? "active" : ""
                }`}
                to="/information"
                style={{
                  color:
                    location.pathname === "/information"
                      ? "#6366F1"
                      : "inherit",
                }}
                onClick={() => navigate("/information")}
              >
                {t("more_info")}
              </Link>
            </li>

            <li className="nav-item me-3">
              <button
                className="btn nav-btn-custom"
                onClick={() => navigate("/nutrition-map")}
              >
                {t("nutrition_map")}
              </button>
            </li>

            <li className="nav-item">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="languageDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t("language")}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="languageDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("en")}
                    >
                      English
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("ar")}
                    >
                      العربية
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("es")}
                    >
                      Español
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("zh")}
                    >
                      中文
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("ja")}
                    >
                      日本語
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("ko")}
                    >
                      한국어
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("ru")}
                    >
                      Русский
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleLanguageChange("fr")}
                    >
                      Français
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
