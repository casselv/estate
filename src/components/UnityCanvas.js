// UnityCanvas.js
/* global createUnityInstance */
import React, { useEffect, useRef, useState } from "react";
import "./model.css";

const UnityCanvas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const scriptRef = useRef(null);

  useEffect(() => {
    scriptRef.current = document.createElement("script");
    scriptRef.current.src = "loladot3200.loader.js";
    scriptRef.current.async = true;
    scriptRef.current.onload = () => {
      createUnityInstance(document.getElementById("unity-canvas"), {
        dataUrl: "/loladot3200.data",
        frameworkUrl: "/loladot3200.framework.js",
        codeUrl: "/loladot3200.wasm",
      })
        .then((unityInstance) => {
          window.unityInstance = unityInstance;
          setTimeout(() => {
            setIsLoading(false); // Set loading to false after a 3-second delay
          }, 2500); // Delay the removal of the loading screen by 3 seconds
        })
        .catch((error) => {
          console.error("Unity load error:", error);
          setIsLoading(false); // Also set loading to false on error
        });
    };
    document.body.appendChild(scriptRef.current);

    return () => {
      if (window.unityInstance) {
        window.unityInstance
          .Quit()
          .then(() => {
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
          <img className="backdrop" src="backdrop.png" alt=""></img>
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
