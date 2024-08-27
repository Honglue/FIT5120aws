import { Link, useNavigate } from "react-router-dom"; // 引入 Link 和 useNavigate
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate(); // 使用 useNavigate 钩子

  return (
    <nav className="navbar">
      <div className="logo">Nutritionist</div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>{" "}
        {/* 使用 Link 以统一样式 */}
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/team">Team</Link>
        </li>
        <li>
          <Link to="/process">Process</Link>
        </li>
        <li>
          <button
            className="contact-button"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
