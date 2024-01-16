import React from "react";
import Slider from "react-slick";
import "./RehabCarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RehabCarousel = ({ rehabItems }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const mockRehabItems = [
    {
      title: "Foam Roller",
      link: "/shop",
      mediaSrc: "/appletrew.png", // Replace with your image path
      description: "Use this foam roller for muscle relaxation.",
    },
    {
      title: "Resistance Bands",
      link: "/shop",
      mediaSrc: "/appletrew.png", // Replace with your image path
      description: "Ideal for stretching and strength training.",
    },
    {
      title: "Resistance Bands",
      link: "/shop",
      mediaSrc: "/appletrew.png", // Replace with your image path
      description: "Ideal for stretching and strength training.",
    },
    {
      title: "Resistance Bands",
      link: "/shop",
      mediaSrc: "/appletrew.png", // Replace with your image path
      description: "Ideal for stretching and strength training.",
    },
    {
      title: "Resistance Bands",
      link: "/shop",
      mediaSrc: "/appletrew.png", // Replace with your image path
      description: "Ideal for stretching and strength training.",
    },
    // Add more items as needed
  ];

  return (
    <div className="rehab-carousel">
      <Slider {...settings}>
        {mockRehabItems.map((item, index) => (
          <div key={index} className="rehab-item">
            <div className="shopitem">
              <div className="dog">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <a href={item.link}>Shop</a>
            </div>
            <img src={item.mediaSrc} alt={item.title} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RehabCarousel;
