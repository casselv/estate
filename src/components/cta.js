import React from "react";
import "./cta.css"; // Make sure to import your CSS file
import { Link } from "react-router-dom";

const Cta = () => {
  return (
    <div className="ctabox">
      <div className="infobok">
        <div className="topText">
          <h1>Discover the future of physiotherapy with Anatolink</h1>
          <p>
            Welcome to Anatolink, your personal physiotherapy advisor. Our
            mission is to empower your wellness journey with products tailored
            specifically to your needs. With our innovative AI technology, you
            get more than just a shopping experience you get a personalized path
            to better health."
          </p>
        </div>
        <div className="ctaButtons">
          <Link to="/injury-details" className="injuryLink">
            AI Injury Assessment
          </Link>
          <Link to="/shop" className="shopLink">
            Shop
          </Link>
        </div>
      </div>
      <video className="vid4" autoPlay muted loop>
        <source src="/vid4.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Cta;
