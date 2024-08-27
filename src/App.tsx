import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AwarenessSection from "./components/AwarenessSection";
import DetailsPage from "./components/DetailsPage";
import "./components/App.css";
import { theme } from "./theme";

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
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          {/* Check if the user is authenticated */}
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
                      <DetailsPage />
                    </>
                  }
                />
                {/* <Route path="/details" element={<DetailsPage />} /> */}
              </Routes>
            </>
          ) : (
            // Password Popup
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
  );
}

export default App;
