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

    navigate("/analysis", { state: { names, description } });
  };

  useEffect(() => {
    // Load the Unity script
    const loadUnityScript = () => {
      const script = document.createElement("script");
      script.src = "/loladot4.loader.js"; // Make sure this path is correct
      script.onload = () => {
        createUnityInstance(document.getElementById("unity-canvas"), {
          dataUrl: "/loladot4.data",
          frameworkUrl: "/loladot4.framework.js",
          codeUrl: "/loladot4.wasm",
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

  return (
    <div className="landing-page">
      <p className="dis">select areas of pain or injury</p>
      <div id="custom-loader" class="custom-loader">
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
