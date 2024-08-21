package org.example.foodiebackend.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;

@Getter
@Setter
public class CommentRequest {

    @NotBlank
    private Long userId;
    @NotBlank
    private String comment;
}
