import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./analysis.css";

function Analysis() {
  const location = useLocation();
  const [analysisResult, setAnalysisResult] = useState(null);

  const fetchAnalysis = async (
    names,
    description,
    painLevel,
    duration,
    painType
  ) => {
    console.log("the fetch is running");
    console.log("names", names);
    console.log("description", description);
    console.log("painLevel", painLevel);
    console.log("duration", duration);
    console.log("painType", painType);

    try {
      const response = await fetch("http://localhost:3013/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          names,
          description,
          painLevel,
          duration,
          painType,
        }),
      });

      if (!response.ok) {
        console.error("Server error:", response.statusText);
        return;
      }

      const content = await response.text(); // Get the text content of the response
      setAnalysisResult(content); // Update the state with the response
    } catch (error) {
      console.error("Network error:", error);
      // Handle network errors here
    }
  };

  useEffect(() => {
    console.log("useEffect is running for analysis");
    // Check if state is passed correctly and has the data we need
    if (location.state?.names && location.state.description) {
      const { names, description, painLevel, duration, painType } =
        location.state;
      fetchAnalysis(names, description, painLevel, duration, painType);
    }
  }, [location, location.state]);

  return (
    <div className="analysis-page">
      <div className="result">
        <div className="toptabs">
          <a className="sistitle">Overview</a>
          <a className="sistitle">Symptoms</a>
          <a className="sistitle">Treatments</a>
        </div>

        {/* Render your analysis result here */}
        <p className="ai-content">{JSON.stringify(analysisResult, null, 2)}</p>
      </div>

      <div className="commercial">
        <div className="rehabtitle">Rehabilitation For This Area of Injury</div>
        <div className="rehabshit">
          <div className="topselling">
            <h3>Foam Roller</h3>
            <a>shop</a>
          </div>
          <div className="videoplayer">
            <img src="/appletrew.png"></img>
          </div>
        </div>
        <div className="counter">OOOOOOOOOO</div>
      </div>
    </div>
  );
}

export default Analysis;
