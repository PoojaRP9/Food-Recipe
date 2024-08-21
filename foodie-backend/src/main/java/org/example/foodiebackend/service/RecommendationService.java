package org.example.foodiebackend.service;

import org.example.foodiebackend.payload.response.RecipeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RecommendationService {

    private static final String scriptPath = System.getProperty("user.dir") + "\\src\\main\\java\\org\\example\\foodiebackend\\script";
    @Autowired
    PythonScriptRunnerService runnerService;
    @Autowired
    RecipeService recipeService;

    public List<RecipeResponse> getRecommendedRecipes(String queryName) {
        String[] argsForName = {"-sb", "name", "-q", "\"" + queryName + "\""};
        String[] argsForIngredients = {"-sb", "ingredients", "-q", "\"" + queryName + "\""};
        String forName = runnerService.runPythonScript(scriptPath, "recommend_recipe.py", argsForName);
        String forIngredients = runnerService.runPythonScript(scriptPath, "recommend_recipe.py", argsForIngredients);
        List<String> names = Arrays.stream(forName.split(",")).toList();
        List<String> ingredients = Arrays.stream(forIngredients.split(",")).toList();
        Set<RecipeResponse> recommendedRecipes = new HashSet<>();
        recommendedRecipes.addAll(names.stream().map(i -> recipeService.getByNameIgnoresCase(i)).toList());
        recommendedRecipes.addAll(ingredients.stream().map(i -> recipeService.getByNameIgnoresCase(i)).toList());
        return recommendedRecipes.stream().toList();
    }

    public List<RecipeResponse> getRecommendedRecipesByName(String queryName) {
        String[] argsForName = {"-sb", "name", "-q", "\"" + queryName + "\""};
        String forName = runnerService.runPythonScript(scriptPath, "recommend_recipe.py", argsForName);
        List<String> names = Arrays.stream(forName.split(",")).toList();
        List<RecipeResponse> recommendedRecipes = new ArrayList<>(names.stream().map(i -> recipeService.getByNameIgnoresCase(i)).toList());
        return recommendedRecipes.stream().toList();
    }

    public List<RecipeResponse> getRecommendedRecipesByIngredients(String queryName) {
        String[] argsForIngredients = {"-sb", "ingredients", "-q", "\"" + queryName + "\""};
        String forIngredients = runnerService.runPythonScript(scriptPath, "recommend_recipe.py", argsForIngredients);
        List<String> ingredients = Arrays.stream(forIngredients.split(",")).toList();
        Set<RecipeResponse> recommendedRecipes = new HashSet<>(ingredients.stream().map(i -> recipeService.getByNameIgnoresCase(i)).toList());
        return recommendedRecipes.stream().toList();
    }
}
