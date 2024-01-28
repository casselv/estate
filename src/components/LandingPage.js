/*import React, { useRef, useState } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const descriptionRef = useRef(null);

  const handleAnalyseClick = () => {
    const description = textAreaValue;

    /*const container = document.getElementById("clicked-object-name");
    const names = Array.from(container.querySelectorAll(".object-name")).map(
      (el) => el.textContent
    );

    navigate("/analysis", {
      state: { description, painLevel, duration, painType },
    });
  };

  const [textAreaValue, setTextAreaValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      // Handle backspace explicitly
      setTextAreaValue((value) => value.slice(0, -1));
    } else {
      // Append other keys to the value
      setTextAreaValue((value) => value + e.key);
    }
  };
  // Add this button in your render method for testing

  const [painLevel, setPainLevel] = useState(0);

  const handlePainTypeChange = (e) => {
    setPainType(e.target.value);
  };

  const [painType, setPainType] = useState("");

  const [duration, setDuration] = useState(0);

  return (
    <div className="landing-page">
      <div className="input-container">
        <div className="ting">
          <div id="clicked-object-name"></div>
        </div>
        <div className="godsplan">
          <textarea
            ref={descriptionRef}
            className="diagnose"
            value={textAreaValue}
            placeholder="Describe your injury"
            onKeyDown={handleKeyDown}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />

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
                  onChange={handlePainTypeChange}
                />
                Throbbing
              </label>
              <label>
                <input
                  type="radio"
                  value="sharp"
                  checked={painType === "sharp"}
                  onChange={handlePainTypeChange}
                />
                Sharp
              </label>

              <label>
                <input
                  type="radio"
                  value="ache"
                  checked={painType === "ache"}
                  onChange={handlePainTypeChange}
                />
                Ache
              </label>
              <label>
                <input
                  type="radio"
                  value="stabbing"
                  checked={painType === "stabbing"}
                  onChange={handlePainTypeChange}
                />
                Stabbing
              </label>
            </div>
          </div>
        </div>
        <button className="injuryana" onClick={handleAnalyseClick}>
          analyse
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
 */
