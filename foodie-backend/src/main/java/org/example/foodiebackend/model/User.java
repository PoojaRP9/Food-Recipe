package org.example.foodiebackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    private Boolean subscribed = false;
    private String imagePublicId;

    @Override
    public String toString() {
        return username;
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Like> likes = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Rating> ratings = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<Recipe> recipes = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<Comment> comments = new ArrayList<>();

    public User(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public User(String firstName, String lastName, String email, String username, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
