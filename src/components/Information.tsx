import React from 'react';
import './Information.css'; 

const Information: React.FC = () => {
  return (
    <div className="container">
      <header className="header">
        {/* <img src="path/to/logo.png" alt="Better Nutrition" className="logo" /> */}
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Nutrition Map</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          {/* <img src="path/to/background-image.jpg" alt="Hands" className="hero-image" /> */}
          <div className="hero-content">
            <h1>Essential Information</h1>
            <button className="download-button">Download</button>
          </div>
        </section>

        <section className="info">
          {Array(3).fill(null).map((_, index) => (
            <div key={index} className="info-block">
              <h2>Awareness Gap</h2>
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
              </p>
              <a href="#" className="info-link">A resource for Refugee families for a healthier lifestyle</a>
            </div>
          ))}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-left">
          {/* <img src="path/to/footer-logo.png" alt="Footer Logo" /> */}
          <p>We growing up your business to the international scale.<br />Maxwell, 2023.</p>
        </div>
        <div className="footer-right">
          <div className="footer-links">
            <h4>Company</h4>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
            <a href="#">Pricing</a>
          </div>
          <div className="footer-links">
            <h4>Legal</h4>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookies Policy</a>
            <a href="#">Data Processing</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Information;
