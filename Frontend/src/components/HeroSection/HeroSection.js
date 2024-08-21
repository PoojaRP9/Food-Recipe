import React from "react";
import "./HeroSection.css";
import image1 from "../../assets/Images/image1.jpg";
import image2 from "../../assets/Images/image2.jpg";
import image3 from "../../assets/Images/image3.jpg";
import { NavLink } from "react-router-dom";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const HeroSection = () => {
  const spanStyle = {
    color: "white",
    size: "30px",
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "450px",
    marginTop: "20px",
    borderRadius: "45px",
  };

  const caption = (
    <div className="home">
      <div className="headerContainer">
        <h4>Rise and Shine</h4>
        <h1>It's Recipes time</h1>

        <p>
          FoodieHub Providing various easy to follow recipes from all over the
          world. Learn how to make your cooking testier and easier with us!
        </p>

        <NavLink to="/searchbar" className="nav-link custom-link">
          <button>Check Our Menu</button>
        </NavLink>
      </div>
    </div>
  );
  const slideImages = [
    {
      image: image1,
    },
    {
      image: image2,
    },
    {
      image: image3,
    },
  ];

  return (
    <>
      <div className="slide-container">
        <Fade duration={1000}>
          {slideImages.map((slideImage, index) => (
            <div key={index} className="background-image-herosection">
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.5) 100%), url(${slideImage.image})`,
                }}
              >
                <span style={spanStyle}>{caption}</span>
              </div>
            </div>
          ))}
        </Fade>
      </div>
    </>
  );
};
export default HeroSection;
