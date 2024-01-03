import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./info.css";
import BeatLoader from "react-spinners/BeatLoader";

// Import or define parseAIDescription somewhere above or in a utilities file

function Info() {
  const location = useLocation();
  const { info } = useParams();
  const { imageUrl } = location.state || {}; // Assuming imageUrl is a string
  const [parsedDescription, setParsedDescription] = useState({
    structureMaterials: "",
    interiorDesign: "",
    potentialHazards: "",
    yearBuilt: "",
  });
  const [addyDescription, setAddyDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect is running", imageUrl);

    if (typeof imageUrl === "string" && imageUrl.trim() !== "") {
      setIsLoading(true);
      fetch("http://localhost:3011/api/analyzeImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: imageUrl }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.description) {
            setIsLoading(false);
            const categories = parseAIDescription(data.description);
            setParsedDescription(categories);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error analyzing image:", error);
        });
    }
  }, [imageUrl]);

  useEffect(() => {
    console.log("addy anaylis is running", info);

    if (typeof info === "string" && info.trim() !== "") {
      fetch("http://localhost:3011/api/analyzeAddy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ info: info }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.addyDesc) {
            setAddyDescription(data.addyDesc);
          }
        })
        .catch((error) => {
          console.error("Error analyzing addy desc:", error);
        });
    }
  }, [info]);

  return (
    <div className="info-page">
      <h1>{info}</h1>

      <div className="ex"> X </div>

      {isLoading ? (
        // Show the loader when data is loading
        <div className="loader">
          <BeatLoader loading={isLoading} />
        </div>
      ) : (
        // Render the content once data is loaded
        <>
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="Uploaded" />
            </div>
          )}

          <div className="textbox">
            <div className="textcontainer">
              <h2>Structure & Materials</h2>
              <p>{parsedDescription.structureMaterials}</p>
            </div>

            <div className="textcontainer">
              <h2>Interior Design</h2>
              <p>{parsedDescription.interiorDesign}</p>
            </div>

            <div className="textcontainer">
              <h2>Potential Hazards</h2>
              <p>{parsedDescription.potentialHazards}</p>
            </div>

            <div className="textcontainer">
              <h2>Potential Era</h2>
              <p>{parsedDescription.yearBuilt}</p>
            </div>
            <div className="textcontainer">
              <h2>Location</h2>
              <p>{addyDescription}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function parseAIDescription(description) {
  // Define regex patterns for each category
  const structureMaterialsPattern =
    /Structure\/Materials:\s*-\s*([\s\S]*?)(?=Interior Design:|$)/;
  const interiorDesignPattern =
    /Interior Design:\s*-\s*([\s\S]*?)(?=Potential Hazards:|$)/;
  const potentialHazardsPattern =
    /Potential Hazards:\s*-\s*([\s\S]*?)(?=Year Built:|$)/;
  const yearBuiltPattern = /Year Built:\s*-\s*([\s\S]*?)(?=$)/;

  // Execute regex patterns to find matches
  const structureMaterialsMatch = structureMaterialsPattern.exec(description);
  const interiorDesignMatch = interiorDesignPattern.exec(description);
  const potentialHazardsMatch = potentialHazardsPattern.exec(description);
  const yearBuiltMatch = yearBuiltPattern.exec(description);

  // Extract text for each category, or set a default message if not found
  const structureMaterials = structureMaterialsMatch
    ? structureMaterialsMatch[1].trim()
    : "No structure/materials description available.";
  const interiorDesign = interiorDesignMatch
    ? interiorDesignMatch[1].trim()
    : "No interior design description available.";
  const potentialHazards = potentialHazardsMatch
    ? potentialHazardsMatch[1].trim()
    : "No potential hazards description available.";
  const yearBuilt = yearBuiltMatch
    ? yearBuiltMatch[1].trim()
    : "No year built description available.";

  // Return an object with the parsed categories
  return {
    structureMaterials,
    interiorDesign,
    potentialHazards,
    yearBuilt,
  };
}

export default Info;
