// ModelViewPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./model.css";
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
    navigate("/analysis", {
      state: { names, description, painLevel, duration, painType },
    });
  };

  return (
    <div className="model-view-page">
      <div className="ting">
        <div id="clicked-object-name"></div>
      </div>
      <button className="modelnext" onClick={handleAnalyseClick}>
        Next
      </button>
    </div>
  );
}

export default ModelViewPage;
