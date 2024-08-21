import React, {useEffect, useState} from "react";
import "./RecipeCard.css";
import { FaRegClock, FaUtensils, FaStar } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import AiFillHeart for filled heart icon
import { useNavigate } from "react-router-dom";
import SampleRecipe1 from "../../assets/Images/SampleRecipe1.jpg";
import SampleRecipe2 from "../../assets/Images/SampleRecipe2.jpg";
import SampleRecipe3 from "../../assets/Images/SampleRecipe3.jpg";
import SampleRecipe5 from "../../assets/Images/SampleRecipe5.jpg";
import axios from "axios";

// const recipeData = [
//   {
//     title: "Paneer",
//     image: SampleRecipe1,
//     cuisineType: "Indian",
//     dietLabel: "Vegetarian",
//     cookTime: "30 mins",
//     servings: 4,
//   },
//   {
//     title: "Biryani",
//     image: SampleRecipe2,
//     cuisineType: "Indian",
//     dietLabel: "Non-Vegetarian",
//     cookTime: "1 hr",
//     servings: 6,
//   },
//   {
//     title: "Chocolate Cake",
//     image: SampleRecipe3,
//     cuisineType: "Indian",
//     dietLabel: "Vegetarian",
//     cookTime: "30 mins",
//     servings: 4,
//   },
//   {
//     title: "Egg Curry",
//     image: SampleRecipe5,
//     cuisineType: "Indian",
//     dietLabel: "Non-Vegetarian",
//     cookTime: "1 hr",
//     servings: 6,
//   },
// ];

function SampleCard() {
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/recipe/randomrecipes/4").then((response) => {
      setRecipeData(response.data);
    }).catch(e => console.log(e));
  }, []);

  let navigate = useNavigate();

  const [likedRecipes, setLikedRecipes] = useState([]);
  const [ratings, setRatings] = useState({}); // State to store user ratings

  const handleImageClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleLikeClick = (recipe) => {
    const isLiked = likedRecipes.some((likedRecipe) => likedRecipe.id === recipe.id);
    if (isLiked) {
      if(localStorage.getItem("user")) {
        const config = {
          params: {
            recipeId: recipe.id,
            userId: JSON.parse(localStorage.getItem("user")).id
          }
        }
        console.log(config);
        axios.post("http://localhost:8080/api/recipe/unlike", {}, config).then(res => {
          const updatedLikedRecipes = likedRecipes.filter((likedRecipe) => likedRecipe.id !== recipe.id);
          setLikedRecipes(updatedLikedRecipes);
        });
      }
      else {
        alert("Please sign in before unliking recipes.");
      }
    } else {
      if(localStorage.getItem("user")) {
        const config = {
          params: {
            recipeId: recipe.id,
            userId: JSON.parse(localStorage.getItem("user")).id
          }
        }
        console.log(config);
        axios.post("http://localhost:8080/api/recipe/like", {}, config).then(res => {
          setLikedRecipes(prevState => [...prevState, recipe]);
        });
      }
      else {
        alert("Please sign in before liking recipes.");
      }
    }
  };

  useEffect(() => {
    const config = {
      params: {
        userId: JSON.parse(localStorage.getItem("user")).id,
      }
    }
    axios.get("http://localhost:8080/api/recipe/likedrecipes", config).then((response) => {
      setLikedRecipes(response.data);
    })
  }, []);

  const handleRatingClick = (recipeTitle, rating) => {
    setRatings({ ...ratings, [recipeTitle]: rating });
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
      } else if (i - 0.5 <= rating) {
        // Half star
        stars.push(
          <div key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <FaStar
              size={18}
              color="gold"
              onClick={() => handleRatingClick(recipeTitle, i - 0.5)}
              style={{ cursor: "pointer" }}
            />
            <div style={{ width: 8, overflow: "hidden" }}>
              <FaStar
                size={18}
                color="lightgray"
                onClick={() => handleRatingClick(recipeTitle, i - 0.5)}
                style={{ cursor: "pointer", marginLeft: -8 }}
              />
            </div>
          </div>
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

  return (
    <>
      <div className="Recipe-Container">
        <h1 className="heading">
          Check out these fabulous <span className="subheading">Dishes</span>
        </h1>
        <p className="para">Where there is good food, there is happiness</p>
      </div>
      <div className="sample-cards">
        {recipeData && recipeData.map((recipe, index) => (
          <div className="recipe-card" key={index}>
            <img
              src={recipe.imagePublicId}
              className="recipe-image1"
              alt=""
              onClick={() => handleImageClick(recipe.id)}
            />

            <div className="recipe-card-title">
              <h3>{recipe.name}</h3>
              <span className="heart-icon" onClick={() => handleLikeClick(recipe)}>
                {likedRecipes.some((likedRecipe) => likedRecipe.id === recipe.id) ? (
                  <AiFillHeart size={21} color="red" />
                ) : (
                  <AiOutlineHeart size={21} />
                )}
              </span>
            </div>

            <div className="rating-stars">
              {renderStars(recipe.title)}
            </div>

            <p>Cuisine Type: {recipe.cuisineName}</p>
            <p>Diet Label: {recipe.dietLabel}</p>

            <div className="dish-details">
              <span className="detailed-icon">
                <FaRegClock size={18} />
              </span>
              <p>{recipe.cookingTime}</p>

              <span className="detailed-icon">
                <FaUtensils size={18} />
              </span>
              <p>{recipe.serves}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SampleCard;



// ---------------------- if below code not working, then run the above code-------------------------------




// import React, { useState, useEffect } from "react";
// import "./RecipeCard.css";
// import { FaRegClock, FaUtensils, FaStar } from "react-icons/fa";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; // Import Axios for making HTTP requests

// function SampleCard() {
//   let navigate = useNavigate();

//   const [recipes, setRecipes] = useState(null); // Initialize recipes as null
//   const [likedRecipes, setLikedRecipes] = useState([]);
//   const [ratings, setRatings] = useState({}); // State to store user ratings

//   useEffect(() => {
//     async function fetchRecipes() {
//       try {
//         const response = await axios.get("/api/recipes");
//         setRecipes(response.data);
//       } catch (error) {
//         console.error("Error fetching recipes:", error);
//       }
//     }

//     fetchRecipes();
//   }, []);

//   const handleImageClick = (title) => {
//     navigate(`/recipe/${title.toLowerCase()}`);
//   };

//   const handleLikeClick = (recipe) => {
//     const isLiked = likedRecipes.some((likedRecipe) => likedRecipe.title === recipe.title);
//     if (isLiked) {
//       const updatedLikedRecipes = likedRecipes.filter((likedRecipe) => likedRecipe.title !== recipe.title);
//       setLikedRecipes(updatedLikedRecipes);
//     } else {
//       const updatedLikedRecipes = [...likedRecipes, recipe];
//       setLikedRecipes(updatedLikedRecipes);
//     }
//   };

//   const handleRatingClick = (recipeTitle, rating) => {
//     setRatings({ ...ratings, [recipeTitle]: rating });
//   };

//   const renderStars = (recipeTitle) => {
//     const rating = ratings[recipeTitle] || 0;
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= rating) {
//         // Full star
//         stars.push(
//           <FaStar
//             key={i}
//             size={18}
//             color="gold"
//             onClick={() => handleRatingClick(recipeTitle, i)}
//             style={{ cursor: "pointer" }}
//           />
//         );
//       } else if (i - 0.5 <= rating) {
//         // Half star
//         stars.push(
//           <div key={i} style={{ display: "inline-flex", alignItems: "center" }}>
//             <FaStar
//               size={18}
//               color="gold"
//               onClick={() => handleRatingClick(recipeTitle, i - 0.5)}
//               style={{ cursor: "pointer" }}
//             />
//             <div style={{ width: 8, overflow: "hidden" }}>
//               <FaStar
//                 size={18}
//                 color="lightgray"
//                 onClick={() => handleRatingClick(recipeTitle, i - 0.5)}
//                 style={{ cursor: "pointer", marginLeft: -8 }}
//               />
//             </div>
//           </div>
//         );
//       } else {
//         // Empty star
//         stars.push(
//           <FaStar
//             key={i}
//             size={18}
//             color="lightgray"
//             onClick={() => handleRatingClick(recipeTitle, i)}
//             style={{ cursor: "pointer" }}
//           />
//         );
//       }
//     }
//     return stars;
//   };

//   return (
//     <>
//       <div className="Recipe-Container">
//         <h1 className="heading">
//           Check out these fabulous <span className="subheading">Dishes</span>
//         </h1>
//         <p className="para">Where there is good food, there is happiness</p>
//       </div>
//       <div className="sample-cards">
//         {recipes === null ? ( // Conditionally render blank cards while recipes are loading
//           Array.from({ length: 4 }).map((_, index) => (
//             <div className="recipe-card" key={index}>
//               {/* Blank Card */}
//             </div>
//           ))
//         ) : (
//           recipes.map((recipe, index) => (
//             <div className="recipe-card" key={index}>
//               <img
//                 src={recipe.image}
//                 className="recipe-image1"
//                 alt=""
//                 onClick={() => handleImageClick(recipe.title)}
//               />

//               <div className="recipe-card-title">
//                 <h3>{recipe.title}</h3>
//                 <span className="heart-icon" onClick={() => handleLikeClick(recipe)}>
//                   {likedRecipes.some((likedRecipe) => likedRecipe.title === recipe.title) ? (
//                     <AiFillHeart size={21} color="red" />
//                   ) : (
//                     <AiOutlineHeart size={21} />
//                   )}
//                 </span>
//               </div>

//               <div className="rating-stars">
//                 {renderStars(recipe.title)}
//               </div>

//               <p>Cuisine Type: {recipe.cuisineType}</p>
//               <p>Diet Label: {recipe.dietLabel}</p>

//               <div className="dish-details">
//                 <span className="detailed-icon">
//                   <FaRegClock size={18} />
//                 </span>
//                 <p>{recipe.cookTime}</p>

//                 <span className="detailed-icon">
//                   <FaUtensils size={18} />
//                 </span>
//                 <p>{recipe.servings}</p>
//               </div>

//               <p>Rating: {ratings[recipe.title] || 'N/A'}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// }

// export default SampleCard;
