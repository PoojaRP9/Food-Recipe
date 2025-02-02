package org.example.foodiebackend.repository;

import org.example.foodiebackend.model.ERole;
import org.example.foodiebackend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(ERole name);
}
