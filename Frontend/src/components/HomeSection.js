import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import "./HomeSection.css";
import bg from "../assets/Images/bg.jpg";
import LoginModal from "./Login/LoginModal";

const HomeSection = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginModalShow = () => setShowLoginModal(true);
  const handleLoginModalClose = () => setShowLoginModal(false);

  return (
    <>
      <div className="background-image">
        <div className="front-container bg">
          <div className="front-page">
            <div className="image">
              <img src={bg} alt=" " className="image image-move" />
            </div>
          </div>

          <div className="foodieHub-Description">
            <p className="para-front">
              Let's Start Cooking <br /> With Popular{" "}
              <span className="para-front-recipe">
                Recipes
                <RestaurantIcon className="icon" />
              </span>
            </p>

            <h5>
              FoodieHub is an online application designed to inspire and assist
              <br />
              users in discovering new and exciting recipes based on their
              <br />
              preferences. The platform aims to provide a user-friendly
              <br />
              experience for individuals passionate about cooking
            </h5>
            <button className="get get-started" onClick={handleLoginModalShow}>
              {" "}
              Get Started <FiArrowRight />
            </button>
          </div>
        </div>
        <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
      </div>
    </>
  );
};

export default HomeSection;
