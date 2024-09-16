import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../public/images/logo.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer mt-auto p-3 w-100 bg-light">
      <div className="container bg-light">
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
                <h5 className="fw-bold mb-2">
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
                <h5 className="fw-bold">Quick Links</h5>
                <ul className="list-unstyled" style={{ paddingTop: "10px" }}>
                  <li style={{ color: "#666" }}>Nutrition Info</li>
                  <li style={{ color: "#666" }}>Nutrition Map</li>
                  <li style={{ color: "#666" }}>Nutrition Indicator</li>
                </ul>
              </div>

              {/* Policies Section */}
              <div className="col-md-6">
                {/* <h5 className="fw-bold">Policies</h5> */}
                <ul className="list-unstyled" style={{ paddingTop: "46px" }}>
                  <li style={{ color: "#666" }}>Nutrition Quiz</li>
                  <li style={{ color: "#666" }}>Food Nutiriton Detector</li>
                  {/* <li style={{ color: "#666" }}>Cookies Policy</li> */}
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
