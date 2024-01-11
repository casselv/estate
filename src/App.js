import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes from 'react-router-dom'

import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import Analysis from "./components/analysis";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analysis/" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;
