// UnityCanvas.js
/* global createUnityInstance */
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const UnityCanvas = () => {
  const location = useLocation();
  const scriptRef = useRef(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    // Adjust these paths as necessary for your app's routing structure
    const shouldLoadUnity =
      location.pathname === "/pain-details" || location.pathname === "/model";

    if (shouldLoadUnity && !loadedRef.current) {
      scriptRef.current = document.createElement("script");
      scriptRef.current.src = "/loladot1300.loader.js";
      scriptRef.current.async = true;
      scriptRef.current.onload = () => {
        createUnityInstance(document.getElementById("unity-canvas"), {
          dataUrl: "/loladot1300.data",
          frameworkUrl: "/loladot1300.framework.js",
          codeUrl: "/loladot1300.wasm",
        })
          .then((unityInstance) => {
            unityInstance.o["WebGLInput"].captureAllKeyboardInput = false;
            window.unityInstance = unityInstance;
            loadedRef.current = true; // Update the ref to indicate Unity is loaded
          })
          .catch((message) => {
            console.error("Unity load error:", message);
          });
      };
      document.body.appendChild(scriptRef.current);
    }

    return () => {
      if (window.unityInstance && loadedRef.current && !shouldLoadUnity) {
        window.unityInstance
          .Quit()
          .then(() => {
            console.log("Unity instance quit successfully");
            window.unityInstance = null;
            loadedRef.current = false; // Update the ref to indicate Unity is unloaded
          })
          .catch((error) => {
            console.log("Failed to quit Unity instance:", error);
          });

        if (scriptRef.current) {
          document.body.removeChild(scriptRef.current);
          scriptRef.current = null; // Clear the script reference to prevent memory leaks
        }
      }
    };
  }, [location.pathname]); // Dependency on location.pathname

  const isModel = location.pathname === "/model";

  return (
    <canvas
      style={{ display: isModel ? "block" : "none" }}
      id="unity-canvas"
      width="960"
      height="600"
    ></canvas>
  );
};

export default UnityCanvas;
