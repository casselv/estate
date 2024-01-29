// InjuryDetailsPage.js
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function InjuryDetailsPage() {
  const navigate = useNavigate();
  const descriptionRef = useRef(null);
  const [description, setTextAreaValue] = useState("");

  console.log("what check", description);

  const handleNext = () => {
    navigate("/pain-details", { state: { description } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      // Handle backspace explicitly
      setTextAreaValue((value) => value.slice(0, -1));
    } else {
      // Append other keys to the value
      setTextAreaValue((value) => value + e.key);
    }
  };

  return (
    <div className="landing-page">
      <div className="input-container">
        <textarea
          className="diagnose"
          value={description}
          ref={descriptionRef}
          placeholder="Describe how your injury occured"
          onKeyDown={handleKeyDown}
          onChange={(e) => setTextAreaValue(e.target.value)}
        />

        <button className="injuryana" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default InjuryDetailsPage;
