import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./analysis.css";
import Spinner from "./Spinner";
import RehabCarousel from "./RehabCarousel";
import rehabItems from "./mockrehab";

function Analysis() {
  const location = useLocation();
  const [analysisSections, setAnalysisSections] = useState({
    overview: [],
    symptoms: [],
    treatment: [],
  });

  const [lastWord, setLastWord] = useState("");

  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      // Assume location.state contains necessary info for fetching analysis
      const { names, description, painLevel, duration, painType } =
        location.state || {};

      // Key to store and retrieve cached data
      const cacheKey = "analysisData";
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimeKey = "analysisCacheTime";
      const cachedTime = localStorage.getItem(cacheTimeKey);

      // Check if cache is valid, let's say we consider 1 hour as valid cache time
      const hour = 1000 * 60 * 60;
      if (
        cachedData &&
        cachedTime &&
        new Date().getTime() - cachedTime < hour
      ) {
        const parsedCacheData = JSON.parse(cachedData);
        setAnalysisSections(parsedCacheData);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
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
          throw new Error("Server error");
        }

        const content = await response.text();
        const parsedContent = parseAIResponse(content);

        // Update cache with new data
        localStorage.setItem(cacheKey, JSON.stringify(parsedContent));
        localStorage.setItem(cacheTimeKey, new Date().getTime().toString());

        setAnalysisSections(parsedContent);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetching error:", error);
        setIsLoading(false);
      }
    };

    if (location.state?.names && location.state.description) {
      fetchAnalysis();
    }
  }, [location, location.state]);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <h3 className="func">Overview</h3>
            <ul className="bonk">
              {analysisSections.overview.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        );
      case "symptoms":
        return (
          <>
            <h3 className="func">Symptoms</h3>
            <ul className="bonk">
              {analysisSections.symptoms.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </>
        );
      case "treatments":
        return (
          <>
            <h3 className="func">Treatments</h3>
            <ul className="bonk">
              {analysisSections.treatment.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
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

    const findSectionStart = (sectionName) => {
      const index = text.indexOf(sectionName);
      return index;
    };

    /* <div className="rehabtitle">Rehabilitation For This Area of Injury</div>*/

    const overviewStart = findSectionStart("Overview:");
    const symptomsStart = findSectionStart("Symptoms:");
    const treatmentStart = findSectionStart("Treatment:");

    if (overviewStart !== -1 && symptomsStart !== -1) {
      let overviewText = text
        .slice(overviewStart + "Overview:".length, symptomsStart)
        .trim();
      overview = overviewText
        .split("\n")
        .filter((line) => line.trim().startsWith("-"))
        .map((line) => line.trim().slice(1).trim()); // Assuming overview can be formatted into bullet points
    } else {
      overview = []; // Default to an empty array or handle appropriately
    }

    if (symptomsStart !== -1 && treatmentStart !== -1) {
      let symptomsText = text
        .slice(symptomsStart + "Symptoms:".length, treatmentStart)
        .trim();
      symptoms = symptomsText
        .split("\n")
        .filter((line) => line.trim().startsWith("-"))
        .map((line) => line.trim().slice(1).trim()); // Assuming symptoms can be formatted into bullet points
    } else {
      symptoms = []; // Default to an empty array or handle appropriately
    }

    if (treatmentStart !== -1) {
      let treatmentText = text
        .slice(treatmentStart + "Treatment:".length)
        .trim();

      // Ensure treatmentText is a string before trying to split it
      if (typeof treatmentText === "string") {
        treatment = treatmentText
          .split("\n")
          .filter((line) => line.trim().startsWith("-"))
          .map((line) => line.trim().slice(1).trim()); // Remove the hyphen and trim spaces
      } else {
        // Handle the case where treatmentText is not a string
        console.error(
          "Expected treatmentText to be a string, received:",
          typeof treatmentText
        );
        treatment = []; // Default to an empty array or handle appropriately
      }
    }

    /*treatment =
      treatmentStart !== -1
        ? text.slice(treatmentStart + "Treatment:".length).trim()
        : "";*/
    if (Array.isArray(treatment) && treatment.length > 0) {
      // Get the last string from the treatment array
      const lastString = treatment[treatment.length - 1];
      // Now split the last string to find the last word
      const lastWord = lastString.split(" ").pop().toLowerCase();
      setLastWord(lastWord);
    } else {
      // Handle the case where treatment is not an array or is empty
      setLastWord(""); // Or set to a default value or handle as needed
    }

    return { overview, symptoms, treatment };
  }

  if (isLoading) {
    return <Spinner />;
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

        <div className="ai-content">{renderContent()}</div>
      </div>

      <div className="commercial">
        <RehabCarousel rehabItems={rehabItems} selectedCategory={lastWord} />
      </div>
    </div>
  );
}

export default Analysis;
