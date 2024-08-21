import React, {useEffect, useState} from "react";
import "./SearchBar.css";
import CustomNavbar from "../Main/CustomNavbar";
import RecipeCard from "../Cards/RecipeCard";
import axios from "axios";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name"); // Default search type
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    if (searchQuery === "") {
      axios.get("http://localhost:8080/api/recipe/all").then((response) => {
        setRecipeData(response.data);
      }).catch(e => console.log(e));
    }
  }, []);

  const handleSearch = () => {
    axios.get(`http://localhost:8080/api/recommend/${searchType}/${searchQuery}`).then((response) => {
      setRecipeData(response.data);
    }).catch(e => console.log(e));
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageName = file.name;
        setSearchQuery(imageName);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    if (type === "name") {
      setSearchQuery("");
    } else if (type === "ingredients") {
      setSearchQuery("");
      // Implement functionality for searching by ingredients
      // For example, you can call a function here to handle the search
    }
  };

  return (
    <div>
      <CustomNavbar />
      <h4>
        Not sure what to cook today? Browse our full library of delicious recipe
        ideas
      </h4>
      <div
        className="search-container"
        style={{ backgroundImage: "../../assets/Images/image3.jpg" }}
      >
       <div className="container h-screen flex justify-center items-center">
  <div className="search-options-container">
    <div className="search-options">
      <button
        className={`search-option-btn ${searchType === "name" ? "active" : ""}`}
        onClick={() => handleSearchTypeChange("name")}
      >
        Search by Name
      </button>
      <button
        className={`search-option-btn ${searchType === "ingredients" ? "active" : ""}`}
        onClick={() => handleSearchTypeChange("ingredients")}
      >
        Search by Ingredients
      </button>
    </div>
   
  </div>

          <div className="relative">
            <div className="search-icon">
              <i className="fas fa-search"></i>
            </div>

            <input
              type="text"
              className="search-input"
              placeholder={
                searchType === "name"
                  ? "Enter a recipe name..."
                  : "Enter ingredients..."
              }
              value={searchQuery}
              onChange={handleChange}
            />
            <div className="search-button">
              <button className="search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <RecipeCard recipeData={recipeData} />
    </div>
  );
}

export default SearchBar;
