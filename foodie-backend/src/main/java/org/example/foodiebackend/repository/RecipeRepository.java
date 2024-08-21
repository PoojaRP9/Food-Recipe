package org.example.foodiebackend.repository;

import org.example.foodiebackend.model.Category;
import org.example.foodiebackend.model.Recipe;
import org.example.foodiebackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Optional<Recipe> findById(Long id);
    List<Recipe> findAllByCategory(Category category);
    Optional<Recipe> findByNameIgnoreCase(String name);
    List<Recipe> findAllRecipesByUser(User user);
}
