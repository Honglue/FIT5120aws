import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../public/images/logo.png";
// import { Link } from "react-router-dom";

function DetailsPage() {
  return (
    <div className="container text-center my-5">
      {/* Header Section */}
      <header className="mb-5">
        <h1>A platform to Empower You</h1>
        <p className="lead">
          We are here to empower refugee families with the necessary tools. Here
          is how.
        </p>
      </header>

      {/* Card Container */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-4 mb-4">
          <div className="card bg-light text-dark h-100 d-flex align-items-center justify-content-center">
            <div className="card-body">
              <h5 className="card-title">Map</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-light text-dark h-100 d-flex align-items-center justify-content-center">
            <div className="card-body">
              <h5 className="card-title">Info</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-primary text-white h-100 d-flex align-items-center justify-content-center">
            <div className="card-body">
              <h5 className="card-title">Analyser</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="d-flex justify-content-between align-items-center p-3 bg-light">
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="Better Nutrition"
            width="25"
            height="30"
            className="me-2"
          />
          <p className="mb-0">
            We aim to continue to make a positive impact.
            <br />
            BetterNutrition, 2024.
          </p>
        </div>
        {/* Uncomment this section to add footer links */}
        {/* 
        <div className="d-flex">
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
        </div>
        */}
      </footer>
    </div>
  );
}

export default DetailsPage;
