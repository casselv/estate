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
    console.log("on gg pull a glock", names);
    console.log(description);
    console.log("painLevel", painLevel);
    console.log("duration", duration);
    console.log("painType", painType);

    try {
      const response = await fetch(
        "https://estateserver-production.up.railway.app/api/analyze",
        {
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
        }
      );

      if (!response.ok) {
        console.error("Server error:", response.statusText);
        return;
      }

      const reader = response.body.getReader();

      // Continuously read from the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break; // Exit the loop if the stream is finished

        // Convert the Uint8Array to a string
        const chunkText = new TextDecoder().decode(value);
        setAnalysisResult((prevContent) => (prevContent || "") + chunkText);
      }
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
        <h2 className="sistitle">Analysis Result</h2>
        {/* Render your analysis result here */}
        <p className="ai-content">{JSON.stringify(analysisResult, null, 2)}</p>
      </div>
    </div>
  );
}

export default Analysis;
