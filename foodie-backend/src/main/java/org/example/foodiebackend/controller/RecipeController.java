package org.example.foodiebackend.controller;

import org.example.foodiebackend.payload.request.RecipeRequest;
import org.example.foodiebackend.service.CloudinaryUploadService;
import org.example.foodiebackend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/recipe")
@CrossOrigin("*")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @PostMapping("/add")
    public ResponseEntity<?> addRecipe(@ModelAttribute RecipeRequest recipeRequest) {
        return ResponseEntity.ok(recipeService.addRecipe(recipeRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRecipe(@PathVariable("id") Long id) {
        return ResponseEntity.ok(recipeService.getRecipeById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @PostMapping("/like")
    public ResponseEntity<?> likeRecipe(@RequestParam Long recipeId, @RequestParam Long userId) {
        return ResponseEntity.ok(recipeService.likeRecipe(recipeId, userId));
    }

    @PostMapping("unlike")
    public ResponseEntity<?> unlikeRecipe(@RequestParam Long recipeId, @RequestParam Long userId) {
        return ResponseEntity.ok(recipeService.unlikeRecipe(recipeId, userId));
    }

    @PostMapping("addrating")
    public ResponseEntity<?> addRating(@RequestParam Long recipeId, @RequestParam Long userId, @RequestParam Integer rating) {
        return ResponseEntity.ok(recipeService.addRating(recipeId, userId, rating));
    }

    @PostMapping("updaterating")
    public ResponseEntity<?> updateRating(@RequestParam Long recipeId, @RequestParam Long userId, @RequestParam Integer rating) {
        return ResponseEntity.ok(recipeService.updateRating(recipeId, userId, rating));
    }

    @GetMapping("/likedrecipes")
    public ResponseEntity<?> getLikedRecipes(@RequestParam Long userId) {
        return ResponseEntity.ok(recipeService.getLikedRecipes(userId));
    }

    @GetMapping("/getbycategory")
    public ResponseEntity<?> getRecipesByCategory(@RequestParam String category) {
        return ResponseEntity.ok(recipeService.getByCategory(category));
    }

    @GetMapping("/byuser")
    public ResponseEntity<?> getRecipesByUser(@RequestParam Long userId) {
        return ResponseEntity.ok(recipeService.getByUser(userId));
    }

    @GetMapping("/randomrecipes/{count}")
    public ResponseEntity<?> getRandomRecipes(@PathVariable Integer count) {
        return ResponseEntity.ok(recipeService.getRandomRecipes(count));
    }
}
