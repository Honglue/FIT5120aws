import "bootstrap/dist/css/bootstrap.min.css";
// import logo from "../../public/images/logo.png";
// import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-auto d-flex justify-content-center align-items-center p-3 bg-light w-100">
      {/* Ensure full width and stick to bottom */}
      <div className="text-center">
        {/* <img
            src={logo}
            alt="Better Nutrition"
            width="25"
            height="30"
            className="me-2"
          /> */}
        <p className="mb-0" style={{ fontWeight: "bold" }}>
          We aim to continue to make a positive impact.
        </p>
        <p>BetterNutrition 2024.</p>
      </div>
      {/* Uncomment this section to add footer links */}
      {/* <div className="d-flex">
          <div className="me-4">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>Blog</li>
              <li>Careers</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookies Policy</li>
              <li>Data Processing</li>
            </ul>
          </div>
        </div> */}
    </footer>
  );
}

export default Footer;
