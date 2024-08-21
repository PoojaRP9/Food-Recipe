import React from "react";
import Recipe from "../../assets/Images/Recipe.jpg";
import "./RecipeSkill.css";
import { NavLink } from "react-router-dom";

const RecipeSkill = () => {
  const skillItems = [
    "Learn new Recipe",
    "Experiment with food",
    "Ingredient Knowledge",
    "Upload your own recipes",
    "Know nutrition facts",
    "Get cooking tips",
  ];

  return (
    <>
      <div className="recipeSkill">
        <div className="recipeSkill-image">
          <h1 className="tryMeText">Try Me !</h1>
          <img src={Recipe} alt="img" className="image" />
        </div>

        <div className="recipeSKill-info">
          <h3>
            Improve Your <br />
            <span>Culinary Skills</span>
          </h3>

          <ul className="no-bullets">
            {skillItems.map((item, index) => (
              <li key={index}>
                <span className="small-list-item">{item}</span>
              </li>
            ))}
          </ul>

          <NavLink to="/searchbar">
            <button className="btn-checkMenu">Check Now</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default RecipeSkill;
