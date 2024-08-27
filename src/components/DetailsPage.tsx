import "./DetailsPage.css"; // 为新页面创建的样式文件

function DetailsPage() {
  return (
    <div className="details-page">
      <header className="details-header">
        <img src="your-logo-path" alt="Logo" className="logo" />
        <h1>Everything you need</h1>
      </header>

      <div className="card-container">
        <div className="card map">Map</div>
        <div className="card info">Info</div>
        <div className="card analyser">Analyser</div>
      </div>

      <footer className="details-footer">
        <div className="footer-logo">
          <img src="your-logo-path" alt="Logo" />
          <p>
            We growing up your business to the international scale.
            <br />
            Maxwell, 2023.
          </p>
        </div>
        <div className="footer-links">
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
        </div>
      </footer>
    </div>
  );
}

export default DetailsPage;
