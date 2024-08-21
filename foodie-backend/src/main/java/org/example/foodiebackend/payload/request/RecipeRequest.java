package org.example.foodiebackend.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.foodiebackend.model.MealType;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecipeRequest {

    @NotBlank
    private String name;
    @NotBlank
    private String ingredients;
    @NotBlank
    private String description;
    @NotBlank
    private String instructions;
    @NotBlank
    private String category;
    @NotBlank
    private String user;
    @NotBlank
    private String cuisineName;
    @NotBlank
    private String mealType;
    @NotBlank
    private String dietLabel;
    @NotBlank
    private String healthLabel;
    @NotBlank
    private Integer cookingTime;
    @NotBlank
    private Integer serves;
    private List<String> nutritionTypeList;
    private List<Integer> valueList;
    private MultipartFile recipeImage;
    private String youtubeUrl;
}
