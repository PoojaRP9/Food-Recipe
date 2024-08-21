package org.example.foodiebackend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String imagePublicId;
}
