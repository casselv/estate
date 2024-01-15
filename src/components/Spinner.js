// ProgressSpinner.js
import React from "react";
import "./Spinner.css"; // Make sure to create a ProgressSpinner.css file

const Spinner = ({ progress }) => {
  const radius = 20;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-spinner">
      <h2>Analyzing...</h2>
      <svg className="progress-ring" height="50" width="50">
        <circle
          className="progress-ring__circle"
          stroke="blue"
          strokeWidth="4"
          fill="transparent"
          r={radius}
          cx="25"
          cy="25"
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
    </div>
  );
};

export default Spinner;
