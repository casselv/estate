import React from "react";
import { Link } from "react-router-dom"; // Import this only if you're using React Router
import "./navbar.css"; // Make sure to create a corresponding CSS file

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">AnatoLink</Link>
        </li>
        {/* Add more list items as needed */}
      </ul>
      <div className="menu-icon">&#9776;</div>
    </nav>
  );
};

export default NavigationBar;
