package org.example.foodiebackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Nutrition {

    public Nutrition(String nutritionType, Integer value, Recipe recipe) {
        this.nutritionType = nutritionType;
        this.value = value;
        this.recipe = recipe;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String nutritionType;
    @NotBlank
    private Integer value;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;
}
