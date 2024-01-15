import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./analysis.css";
import Spinner from "./Spinner";
import RehabCarousel from "./RehabCarousel";

function Analysis() {
  const location = useLocation();
  const [analysisSections, setAnalysisSections] = useState({
    overview: "",
    symptoms: "",
    treatment: "",
  });

  const [activeTab, setActiveTab] = useState("overview"); // State to track the active tab
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [progress, setProgress] = useState(0);

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

      const content = await response.text();
      // Get the text content of the response
      const parsedcontent = parseAIResponse(content);
      setAnalysisSections(parsedcontent); // Update the state with the response
    } catch (error) {
      console.error("Network error:", error);
      // Handle network errors here
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <h3>Overview</h3>
            <p>{analysisSections.overview}</p>
          </>
        );
      case "symptoms":
        return (
          <>
            <h3>Symptoms</h3>
            <p>{analysisSections.symptoms}</p>
          </>
        );
      case "treatments":
        return (
          <>
            <h3>Treatments</h3>
            <p>{analysisSections.treatment}</p>
          </>
        );
      default:
        return null;
    }
  };

  function parseAIResponse(text) {
    let overview = "";
    let symptoms = "";
    let treatment = "";

    // Function to find the start index of each section
    const findSectionStart = (sectionName) => {
      const index = text.indexOf(sectionName);
      return index;
    };

    // Find start indices of each section
    const overviewStart = findSectionStart("Overview:");
    const symptomsStart = findSectionStart("Symptoms:");
    const treatmentStart = findSectionStart("Treatment:");

    // Extract each section, excluding the section headers
    overview =
      overviewStart !== -1 && symptomsStart !== -1
        ? text.slice(overviewStart + "Overview:".length, symptomsStart).trim()
        : "";

    symptoms =
      symptomsStart !== -1 && treatmentStart !== -1
        ? text.slice(symptomsStart + "Symptoms:".length, treatmentStart).trim()
        : "";

    treatment =
      treatmentStart !== -1
        ? text.slice(treatmentStart + "Treatment:".length).trim()
        : "";

    return { overview, symptoms, treatment };
  }

  useEffect(() => {
    console.log("useEffect is running for analysis");

    // Start a timer that updates the progress state
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval); // clear interval if progress is complete
          setIsLoading(false); // Hide the spinner
          return 100;
        }
        return oldProgress + (1000 / 13000) * 100; // increment progress based on the time elapsed
      });
    }, 1000); // update progress every second

    // Check if state is passed correctly and has the data we need
    if (location.state?.names && location.state.description) {
      const { names, description, painLevel, duration, painType } =
        location.state;
      fetchAnalysis(names, description, painLevel, duration, painType);
    }

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [location, location.state]);

  if (isLoading) {
    return <Spinner progress={progress} />; // Show the spinner while loading
  }

  return (
    <div className="analysis-page">
      <div className="result">
        <div className="toptabs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("symptoms")}
            className={`tab-button ${activeTab === "symptoms" ? "active" : ""}`}
          >
            Symptoms
          </button>
          <button
            onClick={() => setActiveTab("treatments")}
            className={`tab-button ${
              activeTab === "treatments" ? "active" : ""
            }`}
          >
            Treatments
          </button>
        </div>

        <div className="ai-content">
          {renderContent()} {/* Call the function here */}
        </div>
      </div>

      <div className="commercial">
        <div className="rehabtitle">Rehabilitation For This Area of Injury</div>
        <RehabCarousel />
      </div>
    </div>
  );
}

export default Analysis;

/*<div className="rehabshit">
          <div className="topselling">
            <h3>Foam Roller</h3>
            <a>shop</a>
          </div>
          <div className="videoplayer">
            <img src="/appletrew.png"></img>
          </div>
        </div>
        <div className="counter"></div>*/
