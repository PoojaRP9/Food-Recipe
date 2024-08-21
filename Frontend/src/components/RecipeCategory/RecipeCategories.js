import React from "react";
import Veg from "../../assets/Images/Veg.jpg";
import Nonveg from "../../assets/Images/Nonveg.jpg";
import Vegan from "../../assets/Images/Vegan.jpg";
import gluten from "../../assets/Images/gluten.jpg";
import Dessert from "../../assets/Images/Dessert.jpg";
import Breakfast from "../../assets/Images/Breakfast.jpg";
import { RiRestaurantFill } from "react-icons/ri";
import "./RecipeCategories.css";

const RecipeCategories = () => {
  const categoryImages = [
    {
      image: Veg,
      name: "Veg",
    },
    {
      image: Nonveg,
      name: "NonVeg",
    },
    {
      image: Vegan,
      name: "Vegan",
    },
    {
      image: gluten,
      name: "Gluten",
    },
    {
      image: Dessert,
      name: "Dessert",
    },
    {
      image: Breakfast,
      name: "Breakfast",
    },
  ];

  return (
    <>
      <h1 className="recipe-categories-title">
        {" "}
        <span>
          <RiRestaurantFill className="category-icon" />
        </span>
        Recipe Categories
      </h1>
      <div className="Recipe-categories">
        {categoryImages.map((data, index) => (
          <div key={index} className="category-container">
            <img
              src={data.image}
              alt={`Category ${index}`}
              className="category-image"
            />
            <p className="category-name">{data.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipeCategories;
