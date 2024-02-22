import React from "react";
import "./cta.css"; // Make sure to import your CSS file
import { Link } from "react-router-dom";

const Cta = () => {
  return (
    <div className="ctabox">
      <img className="tryimage" src="/vector.png" alt=""></img>
      <div className="infobok">
        <div className="topText">
          <h1>Anatolink: Stepping Towards the Future of Physical Therapy</h1>
          <p>
            Anatolink is a complimentary online resource for evaluating and
            assessing physical injuries. It leverages generative AI and
            interactive 3D software to provide comprehensive insights, symptoms,
            and treatment options for a broad spectrum of physical health
            concerns.
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
