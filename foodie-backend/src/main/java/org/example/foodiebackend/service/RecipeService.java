package org.example.foodiebackend.service;

import jakarta.transaction.Transactional;
import org.example.foodiebackend.model.*;
import org.example.foodiebackend.payload.request.RecipeRequest;
import org.example.foodiebackend.payload.response.MessageResponse;
import org.example.foodiebackend.payload.response.RecipeResponse;
import org.example.foodiebackend.repository.LikeRepository;
import org.example.foodiebackend.repository.RatingRepository;
import org.example.foodiebackend.repository.RecipeRepository;
import org.example.foodiebackend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.random.RandomGenerator;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CloudinaryUploadService cloudinaryUploadService;
    private ModelMapper modelMapper = new ModelMapper();

    public RecipeResponse addRecipe(RecipeRequest recipeRequest) {
        Recipe recipe = new Recipe(recipeRequest.getName(), recipeRequest.getIngredients(), recipeRequest.getInstructions(), Category.valueOf(recipeRequest.getCategory()));
        User user = userRepository.findByUsername(recipeRequest.getUser()).orElseThrow();
        if(recipeRequest.getRecipeImage() != null) {
            String url = (String) cloudinaryUploadService.upload(recipeRequest.getRecipeImage()).get("url");
            recipe.setImagePublicId(url);
        }
        if (recipeRequest.getYoutubeUrl() != null && !recipeRequest.getYoutubeUrl().isBlank()) {
            recipe.setYoutubeUrl(recipeRequest.getYoutubeUrl());
        }
        recipe.setDescription(recipeRequest.getDescription());
        recipe.setCuisineName(recipeRequest.getCuisineName());
        recipe.setMealType(MealType.valueOf(recipeRequest.getMealType()));
        recipe.setDietLabel(recipeRequest.getDietLabel());
        recipe.setHealthLabel(recipeRequest.getHealthLabel());
        recipe.setCookingTime(recipeRequest.getCookingTime());
        recipe.setServes(recipeRequest.getServes());
        Set<Nutrition> nutritions = new HashSet<>();
        IntStream.range(0, recipeRequest.getNutritionTypeList().size())
                .mapToObj(i -> new Nutrition(recipeRequest.getNutritionTypeList().get(i), recipeRequest.getValueList().get(i), recipe))
                .forEach(nutritions::add);
        recipe.setNutritions(nutritions);
        recipe.setUser(user);
        Recipe savedRecipe = recipeRepository.save(recipe);
        return mapRecipeToDto(savedRecipe);
    }

    public RecipeResponse getRecipeById(Long id) {
        Recipe recipe = recipeRepository.findById(id).orElseThrow();
        return mapRecipeToDto(recipe);
    }

    @Transactional
    public MessageResponse likeRecipe(Long recipeId, Long userId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        if (likeRepository.existsByUserAndRecipe(user, recipe)) return unlikeRecipe(recipeId, userId);
        Like like = new Like();
        like.setUser(user);
        like.setRecipe(recipe);
        likeRepository.save(like);
        return new MessageResponse("Recipe liked successfully by user " + user.getUsername());
    }

    @Transactional
    public MessageResponse unlikeRecipe(Long recipeId, Long userId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        likeRepository.deleteByUserIdAndRecipeId(user.getId(), recipe.getId());
        return new MessageResponse("Recipe unliked successfully by user " + user.getUsername());
    }

    public List<RecipeResponse> getAllRecipes() {
        List<Recipe> recipes = recipeRepository.findAll();
        return mapRecipeToDto(recipes);
    }

    public RecipeResponse getRandomRecipe() {
        List<Recipe> recipes = recipeRepository.findAll();
        return mapRecipeToDto(recipes).get(RandomGenerator.getDefault().nextInt(0, recipes.size()));
    }

    public MessageResponse addRating(Long recipeId, Long userId, Integer _rating) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        Rating rating = new Rating();
        rating.setUser(user);
        rating.setRecipe(recipe);
        rating.setRating(_rating);
        ratingRepository.save(rating);
        return new MessageResponse("Rating added successfully by user " + user.getUsername());
    }

    public MessageResponse updateRating(Long recipeId, Long userId, Integer _rating) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();
        Rating rating = ratingRepository.findRatingByUserAndRecipe(user, recipe).orElseThrow();
        rating.setRating(_rating);
        ratingRepository.save(rating);
        return new MessageResponse("Rating updated successfully by user " + user.getUsername());
    }

    public List<RecipeResponse> getLikedRecipes(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        List<Recipe> recipes = user.getLikes().stream().map(Like::getRecipe).collect(Collectors.toList());
        return mapRecipeToDto(recipes);
    }

    public List<RecipeResponse> getByCategory(String category) {
        List<Recipe> recipes = recipeRepository.findAllByCategory(Category.valueOf(category));
        return mapRecipeToDto(recipes);
    }

    public RecipeResponse getByNameIgnoresCase(String name) {
        Recipe recipe = recipeRepository.findByNameIgnoreCase(name).get();
        return mapRecipeToDto(recipe);
    }

    public List<RecipeResponse> getByUser(Long id) {
        User user = userRepository.findById(id).get();
        List<Recipe> recipes = recipeRepository.findAllRecipesByUser(user);
        return mapRecipeToDto(recipes);
    }

    public List<RecipeResponse> getRandomRecipes(Integer count) {
        List<Recipe> recipes = recipeRepository.findAll();
        List<RecipeResponse> responses = mapRecipeToDto(recipes);
        Random random = new Random();
        Set<Integer> uniqueIndices = new HashSet<>();
        while (uniqueIndices.size() < count && (responses.size() != uniqueIndices.size())) {
            uniqueIndices.add(random.nextInt(responses.size()));
        }
        return uniqueIndices.stream().map(responses::get).toList();
    }

    public RecipeResponse mapRecipeToDto(Recipe recipe) {
        RecipeResponse recipeResponse = modelMapper.map(recipe, RecipeResponse.class);
        List<String> nutritionTypeList = recipe.getNutritions().stream()
                .map(Nutrition::getNutritionType)
                .toList();

        List<Integer> valueList = recipe.getNutritions().stream()
                .map(Nutrition::getValue)
                .toList();
        recipeResponse.setNutritionTypeList(nutritionTypeList);
        recipeResponse.setValueList(valueList);
        recipeResponse.setUser(recipe.getUser().getUsername());
        recipeResponse.setNumberOfLikes(recipe.getLikes().size());
        recipeResponse.setNumberOfRatings(recipe.getRatings().size());
        recipeResponse.setRating(recipe.getRatings().stream().mapToInt(Rating::getRating).average().orElse(0));
        return recipeResponse;
    }

    private List<RecipeResponse> mapRecipeToDto(List<Recipe> recipes) {
        return recipes.stream().map(this::mapRecipeToDto).collect(Collectors.toList());
    }
}

