import React, { useState } from "react";
import "./entrypoint.css"; // Make sure to import your CSS file

const EntryScreen = ({ onVerifyPasscode }) => {
  const [passcode, setPasscode] = useState("");

  const handleInputChange = (e) => {
    setPasscode(e.target.value);
  };

  const handleSubmit = () => {
    // Trigger the callback function with the entered passcode
    onVerifyPasscode(passcode);
  };

  return (
    <div className="entryScreen">
      <div className="entryContainer">
        <input
          type="password"
          className="passcodeInput"
          value={passcode}
          onChange={handleInputChange}
          placeholder="Enter Passcode"
        />
        <button onClick={handleSubmit} className="submitBtn">
          Enter
        </button>
      </div>
    </div>
  );
};

export default EntryScreen;
