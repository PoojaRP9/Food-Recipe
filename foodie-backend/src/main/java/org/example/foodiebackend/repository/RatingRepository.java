package org.example.foodiebackend.repository;

import org.example.foodiebackend.model.Rating;
import org.example.foodiebackend.model.Recipe;
import org.example.foodiebackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    Optional<Rating> findRatingByUserAndRecipe(User user, Recipe recipe);

    Boolean existsRatingByUserAndRecipe(User user, Recipe recipe);
}
