import React, {useEffect, useState} from "react";
import "./RecipeInfo.css";
import { FaRegClock, FaUtensils, FaPlay, FaShoppingCart, FaStar } from "react-icons/fa";
import SampleRecipe1 from "../../assets/Images/SampleRecipe1.jpg";
import CustomNavbar from "../Main/CustomNavbar";
import axios from "axios";
import {useParams} from "react-router-dom";

function RecipeInfo() {
  const [ratings, setRatings] = useState({});
  const [activeTab, setActiveTab] = useState("Ingredients");
  const [recipeData, setRecipeData] = useState({
    "id": "",
    "name": "",
    "ingredients": "",
    "instructions": "",
    "category": "NON_VEG",
    "cuisineName": "",
    "mealType": "",
    "dietLabel": "",
    "healthLabel": "",
    "cookingTime": "",
    "serves": "",
    "nutritionTypeList": [],
    "valueList": [],
    "user": "",
    "numberOfRatings": "",
    "numberOfLikes": "",
    "rating": ""
  });
  const {id} = useParams();
  useEffect(() => {
    axios.get(`http://localhost:8080/api/recipe/${id}`).then((response) => {
      setRecipeData(response.data);
    }).catch(e => console.log(e));
  }, []);

  const handleRatingClick = (recipeTitle, rating) => {
    setRatings({ ...ratings, [recipeTitle]: rating });
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderStars = (recipeTitle) => {
    const rating = ratings[recipeTitle] || 0;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Full star
        stars.push(
          <FaStar
            key={i}
            size={18}
            color="gold"
            onClick={() => handleRatingClick(recipeTitle, i)}
            style={{ cursor: "pointer" }}
          />
        );
      } else {
        // Empty star
        stars.push(
          <FaStar
            key={i}
            size={18}
            color="lightgray"
            onClick={() => handleRatingClick(recipeTitle, i)}
            style={{ cursor: "pointer" }}
          />
        );
      }
    }
    return stars;
  };

  // Function to calculate average rating for a recipe
  const calculateAverageRating = (recipeTitle) => {
    const recipeRatings = Object.values(ratings).filter((rating) => rating !== undefined);
    const totalRating = recipeRatings.reduce((acc, cur) => acc + cur, 0);
    const averageRating = totalRating / recipeRatings.length;
    return isNaN(averageRating) ? 'N/A' : averageRating.toFixed(1);
  };

  return (
    <div className="background-info">
      <CustomNavbar />
      <div className="recipe-title">
        <h2>{recipeData.name}</h2>
      </div>

      <p className="short-description">
        {recipeData.description}
      </p>

      <div className="info">
        <div className="image-box">
          <img className="recipe-img" src={recipeData.imagePublicId} alt="" />
        </div>
  
        <div className="details">
          <ul>
          <span className="rating">
            {`${calculateAverageRating("Paneer")}`} {/* Replace "Paneer" with actual recipe title */}
            <span className="stars">{renderStars("Paneer")}</span> {/* Replace "Paneer" with actual recipe title */}
          </span>
            <li>Recipe Name : {recipeData.name}</li>
            <li>Recipe Category : {recipeData.category}</li>
            <li>Cuisine Type : {recipeData.cuisineName}</li>
            <li>Meal Type : {recipeData.mealType}</li>
            <li>Diet Label : {recipeData.dietLabel}</li>
            <li>Health Label : {recipeData.healthLabel}</li>
          </ul>

          <div className="cook-servings">
            <span className="detail-icon">
              <FaRegClock size={18} />
            </span>
            <p>Prep/Cooking Time : {recipeData.cookingTime} min</p>

            <span className="detail-icon">
              <FaUtensils size={18} />
            </span>
            <p>Serves : {recipeData.serves}</p>
          </div>


          {/* online food order button */}
          <button className="foodorder" onClick={() => window.open("https://www.swiggy.com", "_blank")}>
  <FaShoppingCart /> Buy this meal from swiggy
</button>


        </div>
      </div>

      <div className="information">
        <div className="detailed-info">
          <p
            className={`info-link ${
              activeTab === "Ingredients" ? "active-link" : ""
            }`}
            onClick={() => handleTabClick("Ingredients")}
          >
            Ingredients
          </p>
          <p
            className={`info-link ${
              activeTab === "Instruction" ? "active-link" : ""
            }`}
            onClick={() => handleTabClick("Instruction")}
          >
            Instruction
          </p>
          <p
            className={`info-link ${
              activeTab === "NutritionInfo" ? "active-link" : ""
            }`}
            onClick={() => handleTabClick("NutritionInfo")}
          >
            Nutrition Insights
          </p>
        </div>

        <div
          className={`info-content ${
            activeTab === "Ingredients" ? "active-info" : ""
          }`}
        >
          <ul className="ingredient-list">
            {recipeData.ingredients.split(',').map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div
          className={`info-content ${
            activeTab === "Instruction" ? "active-info" : ""
          }`}
        >
          <ol className="instruction-list">
            {recipeData.instructions.split(',').map((instruction, index) => (
                <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>

        <div
          className={`info-content ${
            activeTab === "NutritionInfo" ? "active-info" : ""
          }`}
        >
          <table>
            <thead>
              <tr>
                <th>Nutrient</th>
                <th>Amount per Serving</th>
              </tr>
            </thead>
            <tbody>
            {recipeData.nutritionTypeList.map((type, index) => (
                <tr key={index}>
                  <td>{type}</td>
                  <td>{recipeData.valueList[index]}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="recipe-video">
        <div className="video-description">
          <p>
            <FaPlay size={24} style={{ color: "red" }} /> Watch the video below
            to see how to prepare this delicious Paneer Vegetable Curry.
          </p>
        </div>

        <iframe
          title="Recipe Video"
          src={recipeData.youtubeUrl}
        ></iframe>
      </div>
    </div>
  );
}

export default RecipeInfo;
