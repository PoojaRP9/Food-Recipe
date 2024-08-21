package org.example.foodiebackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "recipe")
    Set<Rating> ratings = new HashSet<>();
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "recipe")
    Set<Like> likes = new HashSet<>();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String ingredients;
    @NotBlank
    private String description;
    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String instructions;
    @Enumerated(EnumType.STRING)
    private Category category;
    @NotBlank
    private String cuisineName;
    @NotBlank
    private MealType mealType;
    @NotBlank
    private String dietLabel;
    @NotBlank
    private String healthLabel;

    public Recipe(String name, String ingredients, String description, String instructions, Category category, String cuisineName, MealType mealType, String dietLabel, String healthLabel, Integer cookingTime, Integer serves, String youtubeUrl, User user, String imagePublicId) {
        this.name = name;
        this.ingredients = ingredients;
        this.description = description;
        this.instructions = instructions;
        this.category = category;
        this.cuisineName = cuisineName;
        this.mealType = mealType;
        this.dietLabel = dietLabel;
        this.healthLabel = healthLabel;
        this.cookingTime = cookingTime;
        this.serves = serves;
        this.youtubeUrl = youtubeUrl;
        this.user = user;
        this.imagePublicId = imagePublicId;
    }

    @NotBlank
    private Integer cookingTime;
    @NotBlank
    private Integer serves;
    private String youtubeUrl;
    private String imagePublicId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "recipe")
    private Set<Nutrition> nutritions = new HashSet<>();

    public Recipe(String name, String ingredients, String instructions, Category category, User user) {
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.category = category;
        this.user = user;
    }

    public Recipe(String name, String ingredients, String instructions, Category category) {
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.category = category;
    }
}
