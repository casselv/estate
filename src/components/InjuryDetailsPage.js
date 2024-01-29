// InjuryDetailsPage.js
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import ProgressBar from "./ProgressBar";

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

  useEffect(() => {
    const searchQueries = [
      "I injured my lower leg while playing basketball and it really hurts, feels twisted",
      "I have a sharp pain in my shoulder after lifting weights at the gym",
      "I fell down the stairs and my back is in severe pain",
      "I twisted my ankle while running, and it's swollen and painful",
      "I have a throbbing pain in my wrist after a fall",
    ];

    const typingText = document.getElementById("typing-text");

    let currentIndex = 0;

    function displayNextQuery() {
      typingText.textContent = searchQueries[currentIndex];
      currentIndex = (currentIndex + 1) % searchQueries.length;
    }

    // Initial display
    displayNextQuery();

    // Auto-update the typing text
    const intervalId = setInterval(displayNextQuery, 5000); // Change query every 5 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="landing-page">
      <div className="input-container">
        <div className="typing-container">
          <div className="typing-text" id="typing-text"></div>
        </div>
        <textarea
          className="diagnose"
          value={description}
          ref={descriptionRef}
          placeholder="Briefly describe the injury: cause, symptoms, etc."
          onKeyDown={handleKeyDown}
          onChange={(e) => setTextAreaValue(e.target.value)}
        />

        <button className="injuryana" onClick={handleNext}>
          Next
        </button>
        <ProgressBar step={1} />
      </div>
    </div>
  );
}

export default InjuryDetailsPage;
