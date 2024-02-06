import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import ProgressBar from "./ProgressBar";

function PainDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [description, setTextAreaValue] = useState(
    location.state?.description || ""
  );

  const [painLevel, setPainLevel] = useState(0);
  const [painType, setPainType] = useState("");
  const [duration, setDuration] = useState(0);

  console.log("check", description);

  useEffect(() => {
    if (location.state?.description) {
      setTextAreaValue(location.state.description);
    }
  }, [location.state]);
  const handleAnalyseClick = () => {
    if (!description || !painLevel || !painType || !duration) {
      // Display an alert or show an error message to the user
      alert("Please fill in all fields before proceeding.");
    } else {
      navigate("/model", {
        state: {
          description,
          painLevel,
          painType,
          duration,
        },
      });
    }
  };

  return (
    <div className="pain-page">
      {/* Paste the radio buttons and sliders code here */}
      <div className="optionBox">
        <div className="slides">
          <div className="slider-container">
            <label htmlFor="duration">
              How long has this pain persisted? <span>{duration} Days</span>
            </label>
            <input
              type="range"
              id="duration"
              name="duration"
              min="0"
              max="30" // Assuming the max value for duration is 30 days
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            />
          </div>

          <div className="slider-container">
            <label htmlFor="pain-level">
              Level of Pain? <span>{painLevel} / 10</span>
            </label>
            <input
              type="range"
              id="pain-level"
              name="pain-level"
              min="0"
              max="10" // Assuming the pain level is on a scale of 0 to 10
              value={painLevel}
              onChange={(e) => {
                setPainLevel(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="radio-container">
          <div className="raded">
            {" "}
            <label>
              <input
                type="radio"
                value="throbbing"
                checked={painType === "throbbing"}
                onChange={(e) => setPainType(e.target.value)}
              />
              <span className="radio-button"></span>
              Throbbing
            </label>
          </div>

          <div className="raded">
            <label>
              <input
                type="radio"
                value="sharp"
                checked={painType === "sharp"}
                onChange={(e) => setPainType(e.target.value)}
              />
              <span className="radio-button"></span>
              Sharp
            </label>
          </div>

          <div className="raded">
            <label>
              <input
                type="radio"
                value="ache"
                checked={painType === "ache"}
                onChange={(e) => setPainType(e.target.value)}
              />
              <span className="radio-button"></span>
              Ache
            </label>
          </div>

          <div className="raded">
            <label>
              <input
                type="radio"
                value="stabbing"
                checked={painType === "stabbing"}
                onChange={(e) => setPainType(e.target.value)}
              />
              <span className="radio-button"></span>
              Stabbing
            </label>
          </div>
        </div>
        <button className="injuryana" onClick={handleAnalyseClick}>
          Next
        </button>
      </div>
      {/* End of radio buttons and sliders code */}
      <ProgressBar step={2} />
    </div>
  );
}

export default PainDetailsPage;
