import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import CustomNavbar from "../Main/CustomNavbar";
import "./UploadRecipe.css";
import axios from "axios";

const UploadRecipe = ({submit}) => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
    const [instructions, setInstructions] = useState("");
    const [category, setCategory] = useState("");
    const [cuisineName, setCuisineName] = useState("");
    const [mealType, setMealType] = useState("");
    const [dietLabel, setDietLabel] = useState("");
    const [healthLabel, setHealthLabel] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [serves, setServes] = useState("");
    const [nutritionTypes, setNutritionTypes] = useState([]);
    const [nutritionValues, setNutritionValues] = useState([]);
    const [image, setImage] = useState(null);
    const [youtubeUrl, setYoutubeUrl] = useState("");

    const categoryOptions = [
        "VEG",
        "NON_VEG",
        "VEGAN",
        "GLUTEN",
        "DESSERT",
        "BREAKFAST",
    ];

    const mealTypeOptions = [
        "BREAKFAST",
        "LUNCH",
        "DINNER",
        "SNACK",
        "DESSERT",
    ];

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    }

    const handleAddNutrition = () => {
        setNutritionTypes([...nutritionTypes, ""]);
        setNutritionValues([...nutritionValues, ""]);
    };

    const handleNutritionTypeChange = (index, value) => {
        const newNutritionTypes = [...nutritionTypes];
        newNutritionTypes[index] = value;
        setNutritionTypes(newNutritionTypes);
    };

    const handleNutritionValueChange = (index, value) => {
        const newNutritionValues = [...nutritionValues];
        newNutritionValues[index] = value;
        setNutritionValues(newNutritionValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const processedIngredients = ingredients
            .split(/[,\n]+/)
            .map((ingredient) => ingredient.trim())
            .filter((ingredient) => ingredient.length > 0)
            .join(", ");

        const processedInstructions = instructions
            .split(/[.;]+/)
            .map((instruction) => instruction.trim())
            .filter((instruction) => instruction.length > 0)
            .join(", ");
        const recipeRequest = new FormData();
        recipeRequest.append("name", name);
        recipeRequest.append("ingredients", processedIngredients);
        recipeRequest.append("description", description);
        recipeRequest.append("instructions", processedInstructions);
        recipeRequest.append("category", category);
        recipeRequest.append("user", (localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).username : "anon");
        recipeRequest.append("cuisineName", cuisineName);
        recipeRequest.append("mealType", mealType);
        recipeRequest.append("dietLabel", dietLabel);
        recipeRequest.append("healthLabel", healthLabel);
        recipeRequest.append("cookingTime", parseInt(cookingTime));
        recipeRequest.append("serves", parseInt(serves));
        recipeRequest.append("youtubeUrl", youtubeUrl);
        nutritionTypes.forEach((type, index) => {
            recipeRequest.append("nutritionTypeList", type);
            recipeRequest.append("valueList", parseInt(nutritionValues[index]));
        });
        if (image) {
            recipeRequest.append("recipeImage", image);
        }
        console.log(recipeRequest);
        axios.post("http://localhost:8080/api/recipe/add", recipeRequest).then(res => {
            alert("Recipe Added Successfully");
            navigate("/home");
            console.log(res.data);
        }).catch(e => console.log(e));
    }

    return (
        <>
            <CustomNavbar/>
            <div className="parent-up">
                <div className="container-up">
                    <h1 className="heading-up">Upload Recipe</h1>
                    <div className="form-up">
                        <div className="pair-up">
                            <label htmlFor="name">Recipe Name</label>
                            <input
                                id="name"
                                name="name"
                                className="input-up"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="pair-up">
                            <label htmlFor="ingredients">Ingredients</label>
                            <textarea
                                id="ingredients"
                                name="ingredients"
                                className="textarea-up"
                                value={ingredients}
                                onChange={(e) => setIngredients(e.target.value)}
                            />
                        </div>
                        <div className="pair-up">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                className="textarea-up"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="pair-up">
                            <label htmlFor="instructions">Instructions</label>
                            <textarea
                                id="instructions"
                                name="instructions"
                                className="textarea-up"
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                            />
                        </div>
                        <div className="pair-up">
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                name="category"
                                className="input-up"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categoryOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="pair-up">
                            <label htmlFor="cuisineName">Cuisine Name</label>
                            <input
                                id="cuisineName"
                                name="cuisineName"
                                className="input-up"
                                type="text"
                                value={cuisineName}
                                onChange={(e) => setCuisineName(e.target.value)}
                            />
                        </div>
                        <div className="pair-up">
                            <label htmlFor="mealType">Meal Type</label>
                            <select
                                id="mealType"
                                name="mealType"
                                className="input-up"
                                value={mealType}
                                onChange={(e) => setMealType(e.target.value)}
                            >
                                <option value="">Select Meal Type</option>
                                {mealTypeOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="pair-up">
                            <label htmlFor="dietLabel">Diet Label</label>
                            <input
                                id="dietLabel"
                                name="dietLabel"
                                className="input-up"
                                type="text"
                                value={dietLabel}
                                onChange={(e) => setDietLabel(e.target.value)}
                            />
                        </div>
                        <div className="pair-up">
                            <label htmlFor="healthLabel">Health Label</label>
                            <input
                                id="healthLabel"
                                name="healthLabel"
                                className="input-up"
                                type="text"
                                value={healthLabel}
                                onChange={(e) => setHealthLabel(e.target.value)}
                            />
                        </div>
                        <div className="pair-up">
                            <label htmlFor="cookingTime">Cooking Time</label>
                            <input
                                id="cookingTime"
                                name="cookingTime"
                                className="input-up"
                                type="text"
                                value={cookingTime}
                                onChange={(e) => setCookingTime(e.target.value)}
                            />
                        </div>
                        <div className="pair-up">
                            <label htmlFor="serves">Serves</label>
                            <input
                                id="serves"
                                name="serves"
                                className="input-up"
                                type="text"
                                value={serves}
                                onChange={(e) => setServes(e.target.value)}
                            />
                        </div>
                        <div className="pair-up">
                            <label htmlFor="nutritions" className="label-up">
                                Nutritions
                            </label>
                            <div className="nutrition-container">
                                {nutritionTypes.map((type, index) => (
                                    <div key={index} className="nutrition-pair">
                                        <input
                                            type="text"
                                            placeholder="Nutrition Type"
                                            value={type}
                                            onChange={(e) =>
                                                handleNutritionTypeChange(index, e.target.value)
                                            }
                                            className="input-up"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Nutrition Value"
                                            value={nutritionValues[index]}
                                            onChange={(e) =>
                                                handleNutritionValueChange(index, e.target.value)
                                            }
                                            className="input-up"
                                        />
                                    </div>
                                ))}
                                <button
                                    onClick={handleAddNutrition}
                                    className="add-nutrition-btn"
                                >
                                    Add Nutrition
                                </button>
                            </div>
                        </div>
                        <div className="pair-up">
                            <label htmlFor="image">Upload Image</label>
                            <input
                                id="image"
                                name="image"
                                className="input-up"
                                type="file"
                                onChange={(e) => handleImageUpload(e)}/>
                        </div>
                        <div className="pair-up">
                            <label htmlFor="youtubeUrl">Youtube Url</label>
                            <input
                                id="youtubeUrl"
                                name="youtubeUrl"
                                className="input-up"
                                type="text"
                                value={youtubeUrl}
                                onChange={(e) => setYoutubeUrl(e.target.value)}
                            />
                        </div>
                        <div className="submit-btn-container">
                            <button onClick={handleSubmit} className="submit-btn">
                                <span className="submit-btn-text">Submit Recipe</span>
                                <div className="submit-btn-icon">
                                    <i className="fas fa-utensils"></i>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
        ;
};

export default UploadRecipe;
