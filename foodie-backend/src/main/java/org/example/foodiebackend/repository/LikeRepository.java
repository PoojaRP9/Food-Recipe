package org.example.foodiebackend.repository;

import org.example.foodiebackend.model.Like;
import org.example.foodiebackend.model.Recipe;
import org.example.foodiebackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByUserAndRecipe(User user, Recipe recipe);
    @Modifying
    @Query("DELETE FROM Like e WHERE e.user.id = ?1 AND e.recipe.id = ?2")
    void deleteByUserIdAndRecipeId(Long userId, Long recipeId);
    Boolean existsByUserAndRecipe(User user, Recipe recipe);
}
