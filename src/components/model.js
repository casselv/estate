import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./model.css";
import UnityCanvas from "./UnityCanvas";

// Create a corresponding CSS file for styling

function ModelViewPage() {
  const [showPopup, setShowPopup] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const { description, painLevel, painType, duration } = location.state || {};

  function InstructionPopup({ onClose }) {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <p className="popup-text">
            Rotate and Zoom the 3D model using your mouse or by touching your
            screen. Highlight the areas where you feel discomfort by clicking or
            tapping on them.
          </p>
          <video className="popup-image" autoPlay muted loop>
            <source src="/vid4.mp4" type="video/mp4" />
          </video>
          <button className="popup-close" onClick={onClose}>
            Ok
          </button>
        </div>
      </div>
    );
  }

  const handleAnalyseClick = () => {
    const container = document.getElementById("clicked-object-name");
    const names = Array.from(container.querySelectorAll(".object-name")).map(
      (el) => el.textContent
    );

    if (names.length === 0) {
      alert("Please select an area of pain before proceeding.");
      return;
    }

    // Option to clear cache before navigating
    localStorage.removeItem("analysisData");
    localStorage.removeItem("analysisCacheTime");

    // Using a unique identifier (e.g., timestamp) as part of the state could help in invalidating cache appropriately
    const analysisId = new Date().getTime(); // Example of a unique identifier

    navigate("/analysis", {
      state: { names, description, painLevel, duration, painType, analysisId },
    });
  };

  return (
    <div className="model-view-page">
      {showPopup && <InstructionPopup onClose={() => setShowPopup(false)} />}
      <div className="instruct">Select Regions of Pain</div>
      <UnityCanvas />
      <div className="ting">
        <div id="clicked-object-name"></div>
      </div>
      <button className="modelnext" onClick={handleAnalyseClick}>
        Analyse
      </button>
    </div>
  );
}

export default ModelViewPage;
