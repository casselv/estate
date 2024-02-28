import React from "react";
import "./Footer.css"; // Make sure to create a corresponding CSS file for styling

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <section className="footer-section">
          <h4>About Anatolink</h4>
          <p>
            Empowering you with knowledge about your body and providing the best
            physiotherapy insights to keep you moving and healthy.
          </p>
        </section>
        <section className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </section>
        <section className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: anatolink.com@gmail.com</p>
        </section>
        <section className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="/terms-of-service">Terms of Service</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
          </ul>
        </section>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Anatolink. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
