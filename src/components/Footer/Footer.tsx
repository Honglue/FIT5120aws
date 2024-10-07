import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../public/images/logo.jpg";
import "./Footer.css";

function Footer() {
  return (
    <footer
      className="footer mt-auto w-100 "
      style={{ padding: "20px", borderTop: "1px solid #ddd" }}
    >
      <div className="container ">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: "10px",
          }}
        >
          {/* Left Section: Company Description */}
          <div className="col-md-4 text-start">
            <div className="d-flex">
              <div style={{ paddingRight: "20px" }}>
                <img src={logo} alt="Logo" width="25" height="30" />
              </div>

              <div>
                <h5 className="mb-2">
                  We are committed to providing support to refugees.
                </h5>
                <p>Nutrition Bridge, 2024.</p>
              </div>
            </div>
          </div>

          {/* Right Sections: Two lists closer together and aligned to the right */}
          <div className="col-md-8" style={{ width: "50%" }}>
            <div className="row">
              {/* Quick Links Section */}
              <div className="col-md-6 mb-3">
                <h5 style={{ fontSize: "16px", color: "#888" }}>
                  Identify Gaps
                </h5>
                <ul className="list-unstyled" style={{ paddingTop: "5px" }}>
                  <li>
                    <Link to="/nutrition-map" style={{ fontSize: "15px" }}>
                      Nutrition Map
                    </Link>
                  </li>
                  <li>
                    <Link to="/indicator" style={{ fontSize: "15px" }}>
                      Nutrition Indicator
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Education Section */}
              <div className="col-md-6 mb-3">
                <h5 style={{ fontSize: "16px", color: "#888" }}>Education</h5>
                <ul className="list-unstyled" style={{ paddingTop: "5px" }}>
                  <li>
                    <Link to="/information" style={{ fontSize: "15px" }}>
                      Nutrition Info
                    </Link>
                  </li>
                  <li>
                    <Link to="/quiz" style={{ fontSize: "15px" }}>
                      Nutrition Quiz
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Recommendations Section */}
              <div className="col-md-6 mt-3">
                <h5 style={{ fontSize: "16px", color: "#888" }}>
                  Recommendations
                </h5>
                <ul className="list-unstyled" style={{ paddingTop: "5px" }}>
                  <li>
                    <Link to="/recommendations" style={{ fontSize: "15px" }}>
                      Nutritional Dish Recommender
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
