package org.example.foodiebackend.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String email;
    @NotBlank
    private String message;
}
