import React from "react";
import Slider from "react-slick";
import "./RehabCarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RehabCarousel = ({ rehabItems, selectedCategory }) => {
  console.log("Selected Category:", selectedCategory);

  const cleanCategory = selectedCategory
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .trim()
    .toLowerCase();

  const filteredItems = rehabItems.filter((item) =>
    item.title.toLowerCase().includes(cleanCategory)
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="rehab-carousel">
      <Slider {...settings}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index} className="rehab-item">
              <div className="shopitem">
                <div className="dog">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <a href={item.link}>View all products</a>
              </div>
              <img src={item.mediaSrc} alt={item.title} />
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
