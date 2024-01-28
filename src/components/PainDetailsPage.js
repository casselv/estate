import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LandingPage.css";

function PainDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [textAreaValue, setTextAreaValue] = useState(
    location.state?.textAreaValue || ""
  );

  const [painLevel, setPainLevel] = useState(0);
  const [painType, setPainType] = useState("");
  const [duration, setDuration] = useState(0);

  console.log("check", textAreaValue);

  useEffect(() => {
    if (location.state?.textAreaValue) {
      setTextAreaValue(location.state.textAreaValue);
    }
  }, [location.state]);
  const handleAnalyseClick = () => {
    navigate("/model", {
      state: {
        textAreaValue,
        painLevel,
        painType,
        duration,
      },
    });
  };

  return (
    <div className="pain-page">
      {/* Paste the radio buttons and sliders code here */}
      <div className="optionBox">
        <div className="slides">
          <div className="slider-container">
            <label htmlFor="duration">
              Duration of injury: <span>{duration} Days</span>
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
              Level of Pain: <span>{painLevel} / 10</span>
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
          <p>Pain Type:</p>
          <label>
            <input
              type="radio"
              value="throbbing"
              checked={painType === "throbbing"}
              onChange={(e) => setPainType(e.target.value)}
            />
            Throbbing
          </label>
          <label>
            <input
              type="radio"
              value="sharp"
              checked={painType === "sharp"}
              onChange={(e) => setPainType(e.target.value)}
            />
            Sharp
          </label>

          <label>
            <input
              type="radio"
              value="ache"
              checked={painType === "ache"}
              onChange={(e) => setPainType(e.target.value)}
            />
            Ache
          </label>
          <label>
            <input
              type="radio"
              value="stabbing"
              checked={painType === "stabbing"}
              onChange={(e) => setPainType(e.target.value)}
            />
            Stabbing
          </label>
        </div>
      </div>
      {/* End of radio buttons and sliders code */}

      <button className="injuryana" onClick={handleAnalyseClick}>
        Next
      </button>
    </div>
  );
}

export default PainDetailsPage;
