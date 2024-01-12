/* global createUnityInstance */

import React, { useEffect, useRef, useState } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const descriptionRef = useRef(null);

  const handleAnalyseClick = () => {
    const description = textAreaValue;

    const container = document.getElementById("clicked-object-name");
    const names = Array.from(container.querySelectorAll(".object-name")).map(
      (el) => el.textContent
    );

    navigate("/analysis", {
      state: { names, description, painLevel, duration, painType },
    });
  };

  useEffect(() => {
    // Load the Unity script
    const loadUnityScript = () => {
      const script = document.createElement("script");
      script.src = "/loladot66.loader.js"; // Make sure this path is correct
      script.onload = () => {
        createUnityInstance(document.getElementById("unity-canvas"), {
          dataUrl: "/loladot66.data",
          frameworkUrl: "/loladot66.framework.js",
          codeUrl: "/loladot66.wasm",
          // ... other config settings
        })
          .then((unityInstance) => {
            setTimeout(() => {
              const loader = document.getElementById("custom-loader");
              loader.style.opacity = "0";
              loader.style.visibility = "hidden";

              // Optional: remove the loader from the DOM after the transition
              setTimeout(() => loader.remove(), 1000); // Assuming a 0.5s transition
            }, 2500);

            // Assign the Unity instance to the window object for easy access
            window.unityInstance = unityInstance;
          })
          .catch((message) => {
            console.error("Unity load error:", message);
          });
      };
      document.body.appendChild(script);
    };

    loadUnityScript();

    // Cleanup function
    return () => {
      // Quit the Unity instance when the component unmounts
      if (window.unityInstance) {
        window.unityInstance
          .Quit()
          .then(() => {
            console.log("Unity instance quit successfully");
          })
          .catch((error) => {
            console.log("Failed to quit Unity instance:", error);
          });
      }
    };
  }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount

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

  const getPainLevelDescriptor = (value) => {
    if (value <= 2) {
      return "Mild";
    } else if (value <= 5) {
      return "Moderate";
    } else if (value <= 7) {
      return "Severe";
    } else {
      return "Very Severe";
    }
  };

  const [painLevel, setPainLevel] = useState(0);
  const painLevelDescriptor = getPainLevelDescriptor(painLevel);

  const handlePainTypeChange = (e) => {
    setPainType(e.target.value);
  };

  const [painType, setPainType] = useState("");

  const [duration, setDuration] = useState(0);

  return (
    <div className="landing-page">
      <p className="dis">select areas of pain or injury</p>
      <div id="custom-loader" className="custom-loader">
        Loading Physio...
      </div>
      <canvas id="unity-canvas" width="960" height="600"></canvas>

      <div id="unity-loading-bar">
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full"></div>
        </div>
      </div>

      <div className="input-container">
        <div id="clicked-object-name"></div>

        <textarea
          ref={descriptionRef}
          className="diagnose"
          value={textAreaValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => setTextAreaValue(e.target.value)}
        />

        <div className="optionBox">
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
              Level of Pain: <span>{painLevelDescriptor}</span>
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
                value="dull"
                checked={painType === "dull"}
                onChange={handlePainTypeChange}
              />
              Dull
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
          </div>
        </div>
        <button onClick={handleAnalyseClick}>analyse</button>
      </div>
    </div>
  );
}

export default LandingPage;

/* <input
        <textarea ref={descriptionRef} className="diagnose"></textarea>
type="text"
ref={autocompleteRef}
onChange={(e) => setAddress(e.target.value)}
/> */
