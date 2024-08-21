package org.example.foodiebackend.scheduled;

import org.example.foodiebackend.payload.response.RecipeResponse;
import org.example.foodiebackend.service.RecipeService;
import org.example.foodiebackend.util.CsvGeneratorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Component
public class ScheduledTasks {

    private static final String absolutePath = System.getProperty("user.dir") + "\\src\\main\\java\\org\\example\\foodiebackend\\script\\recipes.csv";
    @Autowired
    CsvGeneratorUtil csvGenerator;
    @Autowired
    RecipeService recipeService;

    @Scheduled(fixedRate = 60000)
    public void generateCsv() {
        List<RecipeResponse> recipes = recipeService.getAllRecipes();
        String csv = csvGenerator.generateRecipeCsv(recipes);
        try (BufferedWriter bufferedWriter = Files.newBufferedWriter(Paths.get(absolutePath))) {
            bufferedWriter.write(csv);
        } catch (IOException ignored) {
        }
    }
}
