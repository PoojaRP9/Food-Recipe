package org.example.foodiebackend.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public Role(ERole name) {
        this.name = name;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "name", length = 20)
    private ERole name;
}
