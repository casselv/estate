import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./analysis.css";
import Spinner from "./Spinner";
import RehabCarousel from "./RehabCarousel";
import rehabItems from "./mockrehab";

function Analysis() {
  const location = useLocation();
  const [analysisSections, setAnalysisSections] = useState({
    overview: "",
    symptoms: "",
    treatment: "",
  });

  const [lastWord, setLastWord] = useState("");
  console.log("drakomalfoy", lastWord);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log("useEffect is running for analysis");

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

        const content = await response.text();
        const parsedcontent = parseAIResponse(content);

        setAnalysisSections(parsedcontent);
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return oldProgress + (1000 / 13000) * 100;
      });
    }, 1000);

    if (location.state?.names && location.state.description) {
      const { names, description, painLevel, duration, painType } =
        location.state;
      fetchAnalysis(names, description, painLevel, duration, painType);
    }

    return () => clearInterval(interval);
  }, [location, location.state]);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <h3 className="func">Overview</h3>
            <p>{analysisSections.overview}</p>
          </>
        );
      case "symptoms":
        return (
          <>
            <h3 className="func">Symptoms</h3>
            <p>{analysisSections.symptoms}</p>
          </>
        );
      case "treatments":
        return (
          <>
            <h3 className="func">Treatments</h3>
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

    const findSectionStart = (sectionName) => {
      const index = text.indexOf(sectionName);
      return index;
    };

    /* <div className="rehabtitle">Rehabilitation For This Area of Injury</div>*/

    const overviewStart = findSectionStart("Overview:");
    const symptomsStart = findSectionStart("Symptoms:");
    const treatmentStart = findSectionStart("Treatment:");

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

    const lastWord = treatment.split(" ").pop().toLowerCase();
    setLastWord(lastWord);

    return { overview, symptoms, treatment };
  }

  if (isLoading) {
    return <Spinner progress={progress} />;
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
