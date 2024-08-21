package org.example.foodiebackend.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class SignUpRequest {

    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String email;
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @NotBlank
    private MultipartFile profilePicture;
}
