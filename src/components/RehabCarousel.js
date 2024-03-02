import React from "react";
import Slider from "react-slick";
import "./RehabCarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RehabCarousel = ({ rehabItems, selectedCategory }) => {
  const validAreas = [
    "Neck",
    "Abdominal",
    "Shoulders",
    "Chest",
    "Biceps",
    "Forearm",
    "Hands",
    "Hips",
    "Glutes",
    "Quadriceps",
    "Calves",
    "Shins",
    "Feet",
    "Back",
    "Hamstrings",
  ];

  // Convert selectedCategory to a format that is comparable with validAreas
  let cleanCategory = selectedCategory
    .replace(/[.,/#$%&*;:{}=\-_`~()]/g, "")
    .trim()
    .toLowerCase();

  // Convert validAreas to lowercase for comparison
  const lowerCaseValidAreas = validAreas.map((area) => area.toLowerCase());

  // Set to 'other' if the category is not one of the valid areas (case-insensitive comparison)
  if (!lowerCaseValidAreas.includes(cleanCategory)) {
    cleanCategory = "other";
  }

  const filteredItems = rehabItems.filter((item) => {
    return cleanCategory === "other"
      ? item.area.toLowerCase() === "other"
      : item.area.toLowerCase().includes(cleanCategory);
    // Case-insensitive comparison for filtering
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  /* <video
                controls
                autoPlay
                muted
                src={item.mediaSrc}
                alt={item.title}
              />*/

  return (
    <div className="rehab-carousel">
      <Slider {...settings}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index} className="rehab-item">
              <div className="shopitem">
                <div className="dog">
                  <h3 className="itemtitles">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
              <div className="vidlink">
                <iframe
                  width="267"
                  height="150"
                  src={item.mediaSrc}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="productconec">
                <div className="topin">
                  <div className="prodlink">{item.linkd}</div>
                  <a href="/shop" className="buylink">
                    view our products
                  </a>
                </div>

                <img className="prodimg" alt="" src={item.prodimg}></img>
              </div>
            </div>
          ))
        ) : (
          <div>No products available for this category.</div>
        )}
      </Slider>
    </div>
  );
};

export default RehabCarousel;
