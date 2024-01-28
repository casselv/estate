// ModelViewPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./model.css";
// Create a corresponding CSS file for styling

function ModelViewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { textAreaValue, painLevel, painType, duration } = location.state || {};

  console.log("ek", textAreaValue);
  console.log("ek", painLevel);
  console.log("ek", painType);
  console.log("ek", duration);

  /*
  const container = document.getElementById("clicked-object-name");
  const names = Array.from(container.querySelectorAll(".object-name")).map(
    (el) => el.textContent
  ); */

  const handleAnalyseClick = () => {
    navigate("/analysis", {
      state: { textAreaValue, painLevel, duration, painType },
    });
  };

  return (
    <div className="model-view-page">
      <h2>click area of pain</h2>

      <button className="injuryana" onClick={handleAnalyseClick}>
        Next
      </button>
    </div>
  );
}

export default ModelViewPage;

/*   /<div className="ting">
        <div id="clicked-object-name"></div>
      </div>*/
