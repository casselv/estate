// UnityCanvas.js
/* global createUnityInstance */
import React, { useEffect, useRef, useState } from "react";
import "./model.css";

const UnityCanvas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const scriptRef = useRef(null);

  useEffect(() => {
    // Immediately attempt to load Unity when the component mounts
    scriptRef.current = document.createElement("script");
    scriptRef.current.src = "/loladot2400.loader.js";
    scriptRef.current.async = true;
    scriptRef.current.onload = () => {
      createUnityInstance(document.getElementById("unity-canvas"), {
        dataUrl: "/loladot2400.data",
        frameworkUrl: "/loladot2400.framework.js",
        codeUrl: "/loladot2400.wasm",
      })
        .then((unityInstance) => {
          window.unityInstance = unityInstance;
          setIsLoading(false); // Set loading to false when Unity loads successfully
        })
        .catch((error) => {
          console.error("Unity load error:", error);
          setIsLoading(false); // Also set loading to false on error
        });
    };
    document.body.appendChild(scriptRef.current);

    return () => {
      // Clean up the Unity instance and the script tag when the component unmounts
      if (window.unityInstance) {
        window.unityInstance
          .Quit()
          .then(() => {
            console.log("Unity instance quit successfully");
            window.unityInstance = null;
          })
          .catch((error) => {
            console.error("Failed to quit Unity instance:", error);
          });
      }

      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, []); // Removed dependency on location.pathname

  // The canvas is always rendered without conditional display logic
  return (
    <>
      {isLoading && (
        <div className="containerpinner">
          loading 3d model
          <div className="pinner"></div>
        </div>
      )}
      <canvas
        style={{ display: isLoading ? "none" : "block" }}
        id="unity-canvas"
        width="960"
        height="600"
      ></canvas>
    </>
  );
};

export default UnityCanvas;
