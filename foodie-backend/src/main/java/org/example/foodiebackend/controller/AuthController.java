package org.example.foodiebackend.controller;

import jakarta.validation.Valid;
import org.example.foodiebackend.model.ERole;
import org.example.foodiebackend.model.Role;
import org.example.foodiebackend.model.User;
import org.example.foodiebackend.payload.request.LoginRequest;
import org.example.foodiebackend.payload.request.SignUpRequest;
import org.example.foodiebackend.payload.response.JwtResponse;
import org.example.foodiebackend.payload.response.MessageResponse;
import org.example.foodiebackend.repository.RoleRepository;
import org.example.foodiebackend.repository.UserRepository;
import org.example.foodiebackend.security.jwt.JwtUtils;
import org.example.foodiebackend.security.services.UserDetailsImpl;
import org.example.foodiebackend.service.CloudinaryUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    CloudinaryUploadService cloudinaryUploadService;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken((UserDetailsImpl) authentication.getPrincipal());
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(),
                userDetails.getEmail(), roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@ModelAttribute SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Email is already in use"));
        }

        User user = new User(signUpRequest.getEmail(),
                signUpRequest.getUsername(),
                passwordEncoder.encode(signUpRequest.getPassword()));
        Set<String> strRoles = new HashSet<>(Set.of("user"));
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role role = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Role is not found"));
            roles.add(role);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Role is not found"));
                        roles.add(adminRole);
                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Role is not found"));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        String url = (String) cloudinaryUploadService.upload(signUpRequest.getProfilePicture()).get("url");
        user.setImagePublicId(url);
        User user1 = userRepository.save(user);
        userRepository.save(user1);

        return ResponseEntity.ok(new MessageResponse("User is registered successfully"));
    }
}
