package org.example.foodiebackend.service;

import org.example.foodiebackend.model.User;
import org.example.foodiebackend.payload.request.ContactRequest;
import org.example.foodiebackend.payload.response.MessageResponse;
import org.example.foodiebackend.payload.response.RecipeResponse;
import org.example.foodiebackend.payload.response.UserResponse;
import org.example.foodiebackend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    EmailService emailService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RecipeService recipeService;
    @Value("${foodie.app.admin.email}")
    private String adminEmail;
    private ModelMapper modelMapper = new ModelMapper();

    public UserResponse getUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            UserResponse response =  modelMapper.map(user.get(), UserResponse.class);
            return response;
        }
        return null;
    }

    public MessageResponse sendRandomRecipeOnce(String email) {
        RecipeResponse randomRecipe = recipeService.getRandomRecipe();
        emailService.sendSimpleMessage(email, "Thank You For Subscribing!",
                "Here is a recommendation\n\n" +
                        "This recipe is called " + randomRecipe.getName() + "\n" +
                        "It can be made using " + randomRecipe.getIngredients() + "\n" +
                        "It is made as follows: " + randomRecipe.getInstructions() + "\n" +
                        "It is a " + randomRecipe.getCategory() + "\n");
        return new MessageResponse("Random recipe has been sent to " + email);
    }

    public MessageResponse subscribeUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            User subscribedUser = user.get();
            if (subscribedUser.getSubscribed() != null && subscribedUser.getSubscribed())
                return new MessageResponse("User already subscribed");
            subscribedUser.setSubscribed(true);
            RecipeResponse randomRecipe = recipeService.getRandomRecipe();
            emailService.sendSimpleMessage(subscribedUser.getEmail(), "Thank You For Subscribing!",
                    "Here is a recommendation\n\n" +
                            "This recipe is called " + randomRecipe.getName() + "\n" +
                            "It can be made using " + randomRecipe.getIngredients() + "\n" +
                            "It is made as follows: " + randomRecipe.getInstructions() + "\n" +
                            "It is a " + randomRecipe.getCategory() + "\n");
            userRepository.save(subscribedUser);
            return new MessageResponse("User subscribed successfully");
        }
        return new MessageResponse("User not subscribed or not found");
    }

    public MessageResponse contactMe(ContactRequest contactRequest) {
        emailService.sendSimpleMessage(adminEmail, "You have a new message from " + contactRequest.getName(),
                contactRequest.getMessage());
        return new MessageResponse("Email sent successfully");
    }
}
