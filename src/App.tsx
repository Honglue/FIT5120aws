import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AwarenessSection from "./components/AwarenessSection";
import DetailsPage from "./components/DetailsPage";
import "./components/App.css";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
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
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
