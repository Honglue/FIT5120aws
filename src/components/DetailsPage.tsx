import "./DetailsPage.css";
import logo from "../../public/images/logo.png";
// import { Link } from "react-router-dom";

function DetailsPage() {
  return (
    <div className="details-page">
      <header className="details-header">
        <h1>A platform to Empower You</h1>
        <p>
          We are here to empower you with the necessary tools. Here is how.{" "}
        </p>
      </header>

      <div className="card-container">
        <div className="card map">Map</div>
        <div className="card info">Info</div>
        <div className="card analyser">Analyser</div>
      </div>

      <footer className="details-footer">
        <div className="footer-logo">
          <img
            src={logo}
            alt="Better Nutrition"
            width="25"
            height="30"
            className="d-inline-block align-top"
          />
          <p>
            We aim to continue to make a positive impact.
            <br />
            BetterNutrition, 2024.
          </p>
        </div>
        {/* <div className="footer-links">
          <div className="company">
            <h4>Company</h4>
            <ul>
              <li>Blog</li>
              <li>Careers</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div className="legal">
            <h4>Legal</h4>
            <ul>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookies Policy</li>
              <li>Data Processing</li>
            </ul>
          </div>
        </div> */}
      </footer>
    </div>
  );
}

export default DetailsPage;
