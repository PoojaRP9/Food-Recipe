package org.example.foodiebackend.controller;

import org.example.foodiebackend.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommend")
@CrossOrigin("*")
public class RecommendationController {

    @Autowired
    RecommendationService recommendationService;

    @GetMapping("{query}")
    public ResponseEntity<?> getRecommendations(@PathVariable String query) {
        return ResponseEntity.ok(recommendationService.getRecommendedRecipes(query));
    }

    @GetMapping("name/{query}")
    public ResponseEntity<?> getRecommendationsByName(@PathVariable String query) {
        return ResponseEntity.ok(recommendationService.getRecommendedRecipesByName(query));
    }

    @GetMapping("ingredients/{query}")
    public ResponseEntity<?> getRecommendationsByIngredients(@PathVariable String query) {
        return ResponseEntity.ok(recommendationService.getRecommendedRecipesByIngredients(query));
    }
}
