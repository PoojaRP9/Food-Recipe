package org.example.foodiebackend.payload.response;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.foodiebackend.model.Nutrition;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecipeResponse {

    private Long id;
    private String name;
    private String ingredients;
    private String description;
    private String instructions;
    private String category;
    private String cuisineName;
    private String mealType;
    private String dietLabel;
    private String healthLabel;
    private Integer cookingTime;
    private Integer serves;
    private List<String> nutritionTypeList;
    private List<Integer> valueList;
    private String imagePublicId;
    private String user;
    private Integer numberOfRatings;
    private Integer numberOfLikes;
    private Double rating;
    private String youtubeUrl;

    public RecipeResponse(Long id, String name, String ingredients, String instructions, String category, String user) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.category = category;
        this.user = user;
    }
}
