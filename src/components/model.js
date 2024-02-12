import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./model.css";
import UnityCanvas from "./UnityCanvas";

// Create a corresponding CSS file for styling

function ModelViewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { description, painLevel, painType, duration } = location.state || {};

  console.log("ek", description);
  console.log("ek", painLevel);
  console.log("ek", painType);
  console.log("ek", duration);

  const handleAnalyseClick = () => {
    const container = document.getElementById("clicked-object-name");
    const names = Array.from(container.querySelectorAll(".object-name")).map(
      (el) => el.textContent
    );

    if (names.length === 0) {
      // Display an alert or show an error message to the user
      alert("Please select an area of pain before proceeding.");
    } else {
      navigate("/analysis", {
        state: { names, description, painLevel, duration, painType },
      });
    }
  };

  return (
    <div className="model-view-page">
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
