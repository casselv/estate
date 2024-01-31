// UnityCanvas.js
/* global createUnityInstance */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const UnityCanvas = () => {
  const location = useLocation();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/loladot400.loader.js"; // Make sure this path is correct
    script.onload = () => {
      createUnityInstance(document.getElementById("unity-canvas"), {
        dataUrl: "/loladot400.data",
        frameworkUrl: "/loladot400.framework.js",
        codeUrl: "/loladot400.wasm",
      })
        .then((unityInstance) => {
          unityInstance.o["WebGLInput"].captureAllKeyboardInput = false;

          // Assign the Unity instance to the window object for easy access
          window.unityInstance = unityInstance;
        })
        .catch((message) => {
          console.error("Unity load error:", message);
        });
    };
    document.body.appendChild(script);

    return () => {
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
  }, []);

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
