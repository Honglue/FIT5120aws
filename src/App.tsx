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
import Recommend from "./components/Recommend/Recommend"; // 正确的导入路径

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
                style={{ minHeight: "100vh" }}
              >
                <div className="card p-4" style={{ width: "300px" }}>
                  <h5 className="mb-3">Enter Password</h5>
                  <input
                    type="password"
                    className="form-control mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePasswordSubmit}
                  >
                    Submit
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
