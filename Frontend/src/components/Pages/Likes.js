import React, {useEffect} from "react";
import "./Likes.css";
import CustomNavbar from "../Main/CustomNavbar";
import RecipeCard from "../Cards/RecipeCard";
import axios from "axios";

function Likes() {
    const [recipeData, setRecipeData] = React.useState([]);
    useEffect(() => {
        const config = {
            params: {
                userId: JSON.parse(localStorage.getItem("user")).id,
            }
        }
        console.log(config);
            axios.get("http://localhost:8080/api/recipe/likedrecipes", config).then((response) => {
                setRecipeData(response.data);
            })
    }, []);
  return (
    <>
      <CustomNavbar />
      <div>
        <h3 className="title-like">Liked Recipes</h3>
        <RecipeCard recipeData={recipeData}/>
      </div>
    </>
  );
}

export default Likes;
