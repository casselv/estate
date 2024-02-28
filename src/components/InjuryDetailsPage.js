// InjuryDetailsPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import ProgressBar from "./ProgressBar";

function InjuryDetailsPage() {
  const navigate = useNavigate();
  const [description, setTextAreaValue] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);

  useEffect(() => {
    const termsAccepted = localStorage.getItem("termsAccepted") === "true";
    if (!termsAccepted) {
      setShowTerms(true);
    }
  }, []);

  const acceptTerms = () => {
    localStorage.setItem("termsAccepted", "true");
    setShowTerms(false);
  };

  const handleNext = () => {
    if (description.trim() === "") {
      // Display an alert or show an error message to the user
      alert("Please enter a description before proceeding.");
    } else {
      // Navigate to the next page if the description is not empty
      navigate("/pain-details", { state: { description } });
    }
  };

  useEffect(() => {
    const searchQueries = [
      "I injured my lower leg while playing basketball and it really hurts, feels twisted",
      "I have a sharp pain in my shoulder after lifting weights at the gym",
      "I fell down the stairs and my back is in severe pain",
      "I twisted my ankle while running, and it's swollen and painful",
      "I have a throbbing pain in my wrist after a fall",
    ];

    const typingText = document.getElementById("typing-text");

    let currentIndex = 0;

    function displayNextQuery() {
      typingText.textContent = searchQueries[currentIndex];
      currentIndex = (currentIndex + 1) % searchQueries.length;
    }

    // Initial display
    displayNextQuery();

    // Auto-update the typing text
    const intervalId = setInterval(displayNextQuery, 5000); // Change query every 5 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="landing-page">
      {showTerms && (
        <div className="termsModalOverlay">
          <div className="termsModal">
            <p>
              Please read and accept the{" "}
              <span
                onClick={() => setShowFullTerms(!showFullTerms)}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                terms of service
              </span>{" "}
              to continue.
            </p>
            {showFullTerms && (
              <div className="scrollableTerms">
                <h1>Disclaimer for Anatolink Risk Assessment</h1>
                <section>
                  <h2>Preamble</h2>
                  <p>
                    This document, henceforth referred to as the "Disclaimer,"
                    sets forth the terms and conditions under which the
                    Anatolink Virtual Physiotherapy Service (hereinafter
                    referred to as "Anatolink") proffers its AI-powered health
                    and physiological advisory services (the "Services") to you,
                    the user (hereinafter referred to as the "Recipient"). By
                    accessing, utilizing, or otherwise engaging with the
                    Services, the Recipient unequivocally acknowledges and
                    consents to the stipulations delineated herein, which are
                    promulgated to govern the use of Anatolink. The Services are
                    imbued with artificial intelligence to facilitate health and
                    physiological guidance; however, the complexity of human
                    physiology and the nascent state of AI technology predicate
                    a disclaimer of warranties and liabilities as set forth
                    below.
                  </p>
                </section>
                <section>
                  <h2>Legal Capacitation</h2>
                  <p>
                    Anatolink, an avant-garde purveyor of virtual physiotherapy
                    advice, harnesses the prowess of artificial intelligence to
                    propound recommendations and guidance tailored to the
                    Recipient’s self-reported symptoms and conditions.
                    Notwithstanding the sophistication of its algorithmic
                    underpinnings, Anatolink’s Services are provided "as is,"
                    devoid of any express, implied, statutory, or other
                    warranties, guarantees, or representations of efficacy,
                    accuracy, or reliability. The Recipient hereby acknowledges
                    the inherent limitations and the experimental nature of
                    AI-driven health advice and assumes full and unmitigated
                    responsibility for all risks associated with the use of the
                    Services.
                  </p>
                </section>
                <section id="disclaimer-of-liability">
                  <h1>Disclaimer of Liability</h1>
                  <p>
                    In no event shall Anatolink, its affiliates, directors,
                    officers, employees, agents, licensors, or successors be
                    held liable for any direct, indirect, incidental, special,
                    punitive, or consequential damages, including but not
                    limited to, personal injury, pain and suffering, emotional
                    distress, loss of revenue, loss of profits, loss of business
                    or anticipated savings, loss of use, loss of goodwill, loss
                    of data, whether caused by tort (including negligence),
                    breach of contract, or otherwise, even if foreseeable,
                    arising out of or in connection with the Recipient’s use of,
                    or inability to use, the Services, any content on the
                    Services, or such other websites or any services or items
                    obtained through the Services or such other websites.
                  </p>
                </section>
                <section id="assumption-of-risk">
                  <h1>Assumption of Risk</h1>
                  <p>
                    The Recipient hereby expressly assents to assume all risks
                    pertaining to the utilization of the Services. It is
                    incumbent upon the Recipient to consult with a licensed
                    healthcare provider prior to the commencement of any new
                    treatment or regimen based on the guidance received from the
                    Services. Anatolink’s Services are not intended to be, nor
                    should they be construed as, a substitute for professional
                    medical advice, diagnosis, or treatment. The Recipient is
                    admonished to seek the counsel of a physician or other
                    qualified health provider with any questions regarding a
                    medical condition.
                  </p>
                </section>
                <section id="indemnification">
                  <h1>Indemnification</h1>
                  <p>
                    The Recipient agrees to defend, indemnify, and hold harmless
                    Anatolink, its affiliates, licensors, and service providers,
                    and its and their respective officers, directors, employees,
                    contractors, agents, licensors, suppliers, successors, and
                    assigns from and against any claims, liabilities, damages,
                    judgments, awards, losses, costs, expenses, or fees
                    (including reasonable attorneys' fees) arising out of or
                    relating to the Recipient’s violation of this Disclaimer or
                    use of the Services, including, but not limited to, any use
                    of the Services' content, services, and products other than
                    as expressly authorized in this Disclaimer or the
                    Recipient’s use of any information obtained from the
                    Services.
                  </p>
                </section>
                <section id="governing-law">
                  <h1>Governing Law</h1>
                  <p>
                    This Disclaimer shall be governed and construed in
                    accordance with the laws of the jurisdiction in which
                    Anatolink operates, without giving effect to any choice or
                    conflict of law provision or rule.
                  </p>
                </section>
                <section id="severability">
                  <h1>Severability</h1>
                  <p>
                    Should any provision of this Disclaimer be held to be
                    unenforceable or invalid under any applicable law or by any
                    applicable arbitral award or court decision, such
                    unenforceability or invalidity shall not render this
                    Disclaimer unenforceable or invalid as a whole, and such
                    provisions shall be deleted without affecting the remaining
                    provisions herein.
                  </p>
                </section>
                <section id="modification-and-variation">
                  <h1>Modification and Variation</h1>
                  <p>
                    Anatolink reserves the right, at its sole discretion, to
                    modify, alter, or otherwise update this Disclaimer at any
                    time. By continuing to access or use our Services after
                    those revisions become effective, the Recipient agrees to be
                    bound by the revised terms.
                  </p>
                </section>
                <section id="acknowledgement">
                  <h1>Acknowledgement</h1>
                  <p>
                    BY UTILIZING THE SERVICES, THE RECIPIENT ACKNOWLEDGES THAT
                    THEY HAVE READ THIS DISCLAIMER IN ITS ENTIRETY, UNDERSTAND
                    ITS CONTENT, AND AGREE TO BE BOUND BY ITS TERMS.
                  </p>
                </section>
              </div>
            )}
            <button onClick={acceptTerms}>
              I Acknowledge and Agree to the Terms
            </button>
          </div>
        </div>
      )}
      <div className="input-container">
        <div className="typing-container">
          <div className="typing-text" id="typing-text"></div>
        </div>
        <textarea
          className="diagnose"
          value={description}
          placeholder="Briefly describe the injury: cause, symptoms, etc."
          onChange={(e) => setTextAreaValue(e.target.value)}
        />

        <button className="injuryana" onClick={handleNext}>
          Next
        </button>
        <ProgressBar step={1} />
      </div>
    </div>
  );
}

export default InjuryDetailsPage;
