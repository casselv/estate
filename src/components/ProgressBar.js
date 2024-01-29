import React from "react";
import "./ProgressBar.css"; // Assuming you have a separate CSS file for styles

export default function ProgressBar({ step }) {
  const percentage = `${(step / 3) * 100}%`;

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: percentage }}></div>
    </div>
  );
}
