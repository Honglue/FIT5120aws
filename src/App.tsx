import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AwarenessSection from "./components/AwarenessSection";
import DetailsPage from "./components/DetailsPage"; // 引入新的页面组件
import "./components/App.css";

function App() {
  return (
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
              </>
            }
          />
          <Route path="/details" element={<DetailsPage />} />{" "}
          {/* 新的路由路径 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
