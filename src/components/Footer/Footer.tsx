import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../public/images/logo.png";

function Footer() {
  return (
    <footer className="footer mt-auto p-5 w-100 bg-light">
      <div className="container bg-light">
        <div className="row">
          {/* Left Section: Company Description */}
          <div className="col-md-4 text-start">
            <div className="d-flex ">
              <div style={{ paddingRight: "20px" }}>
                <img src={logo} alt="Logo" width="25" height="30" />
              </div>

              <div>
                <h5 className="fw-bold mb-2">
                  We are committed to provide support to the refugees.
                </h5>
                <p>Nutrition Bridge, 2024.</p>
              </div>
            </div>
          </div>

          {/* Right Sections: Wrapped in a container with ms-auto */}
          <div className="d-flex ms-auto col-md-6 justify-content-between">
            <div className="text-start">
              <h5 className="fw-bold mb-3">Our team</h5>
              <ul className="list-unstyled">
                <li>Blog</li>
                <li>Careers</li>
                <li>Pricing</li>
              </ul>
            </div>

            <div className="text-start">
              <h5 className="fw-bold mb-3">Resources</h5>
              <ul className="list-unstyled">
                <li>Documentation</li>
                <li>Papers</li>
                <li>Press Conferences</li>
              </ul>
            </div>

            <div className="text-start">
              <h5 className="fw-bold mb-3">Legal</h5>
              <ul className="list-unstyled">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookies Policy</li>
                <li>Data Processing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
