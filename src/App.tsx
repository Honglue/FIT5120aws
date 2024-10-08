import { useState, useEffect } from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Ingredient from "./components/Ingredient/Ingredient";
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
import Recommendations from "./components/Recommendations/Recommendations";
import Quiz from "./components/Quiz/Quiz";
import info from "../public/images/info.jpg";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

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
          <div className="App" style={{ backgroundColor: "#fcfcfc" }}>
            {isAuthenticated ? (
              <>
                <Navbar />
                <ScrollToTop />
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
                  <Route path="/indicator" element={<Recommend />} />
                  <Route path="/ingredient" element={<Ingredient />} />
                  <Route
                    path="/recommendations"
                    element={<Recommendations />}
                  />{" "}
                  <Route path="/quiz" element={<Quiz />} />
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
                  <h4 className="m-3">
                    Welcome to <br /> Nutrition Bridge
                  </h4>

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

                  <h5 className="mb-1">Enter Password</h5>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handlePasswordSubmit();
                      }
                    }}
                  />

                  <button
                    className="btn btn-primary btn-block"
                    onClick={handlePasswordSubmit}
                    style={{
                      width: "100%",
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
