import React from "react";
import "./About.css";
import chef from "../../assets/Images/chef.jpg";
import CustomNavbar from "../Main/CustomNavbar";

const About = () => {
  return (
    <>
      <CustomNavbar />
      <h1 className="about-title">About Us</h1>
      <div className="about">
        <div className="about-info">
          <p className="about-para1">
            <span>FoodieHub</span> suggest recipes tailored to your tastes and
            dietary preferences. Whether you're a vegetarian, vegan,
            gluten-free, or have other dietary restrictions, we've got you
            covered. You can explore a diverse collection of recipes from around
            the world, find step-by-step cooking instructions, and discover the
            nutritional content of each dish
          </p>
          <p className="about-para2">
            Learn how to make your cooking testier and easier with us !
          </p>
        </div>

        <div className="about-image">
          <img src={chef} alt="" />
        </div>
      </div>
    </>
  );
};
export default About;
