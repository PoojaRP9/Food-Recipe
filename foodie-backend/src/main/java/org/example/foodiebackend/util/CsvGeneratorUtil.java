package org.example.foodiebackend.util;

import org.example.foodiebackend.payload.response.RecipeResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CsvGeneratorUtil {

    public String generateRecipeCsv(List<RecipeResponse> recipes) {
        StringBuilder content = new StringBuilder();
        content.append("name,ingredients\n");
        for (RecipeResponse recipe : recipes) {
            content.append(recipe.getName()).append(",");
            content.append("\"").append(recipe.getIngredients()).append("\"\n");
        }
        return content.toString();
    }
}
