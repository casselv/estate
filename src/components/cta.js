import React from "react";
import "./cta.css"; // Make sure to import your CSS file
import { Link } from "react-router-dom";

const Cta = () => {
  return (
    <div className="ctabox">
      <img className="tryimage" src="/vector.png" alt=""></img>
      <div className="infobok">
        <div className="topText">
          <h1>Stepping Towards the Future of Physical Therapy</h1>
          <p>
            Anatolink is a fast free online injury assessment tool. Coupled with
            interactive 3D software, Anatolink leverages generative AI to
            provide comprehensive injury guidance for a vast array of physical
            health concerns.
          </p>
        </div>
        <div className="ctaButtons">
          <Link to="/injury-details" className="injuryLink">
            1 minute AI Injury Assessment
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
