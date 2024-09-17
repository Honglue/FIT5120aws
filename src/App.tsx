import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import AwarenessSection from "./components/Awareness/AwarenessSection";
import DetailsPage from "./components/Details/DetailsPage";
import StatsSource from "./components/StatsSource/StatsSource";
import NutritionMap from "./components/Map/NutritionMap";
import "./components/App.css";
import { theme } from "./theme";
import Information from "./components/Information/Information";
import Footer from "./components/Footer/Footer";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Recommend from "./components/Recommend/Recommend";
import info from "../public/images/info.jpg";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = () => {
    const correctPassword = "tp25-4plusone";
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password, please try again.");
    }
  };

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            {isAuthenticated ? (
              <>
                <Navbar />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Hero />
                        <AwarenessSection />
                        <StatsSource />
                        <DetailsPage />
                      </>
                    }
                  />
                  <Route path="/nutrition-map" element={<NutritionMap />} />
                  <Route path="/information" element={<Information />} />
                  <Route path="/recommend" element={<Recommend />} />
                </Routes>
                <Footer />
              </>
            ) : (
              <div
                className="password-popup d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
              >
                <div
                  className="card p-4 text-center"
                  style={{
                    width: "400px",
                    borderRadius: "15px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Welcome Message */}
                  <h4 className="m-3">Welcome to Nutrition Bridge</h4>

                  {/* Add an image with rounded borders */}
                  <img
                    src={info}
                    alt="Login Icon"
                    className="rounded-circle mb-3"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />

                  <h5 className="mb-3">Enter Password</h5>

                  <input
                    type="password"
                    className="form-control mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />

                  <button
                    className="btn btn-primary btn-block"
                    onClick={handlePasswordSubmit}
                    style={{
                      backgroundColor: "#6366f1",
                      borderColor: "#6366f1",
                      color: "#fff",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#4f46e5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#6366f1")
                    }
                  >
                    Log in
                  </button>
                </div>
              </div>
            )}
          </div>
        </Router>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
