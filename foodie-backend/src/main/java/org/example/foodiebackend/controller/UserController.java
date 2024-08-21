package org.example.foodiebackend.controller;

import org.example.foodiebackend.payload.request.ContactRequest;
import org.example.foodiebackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUser(id));
    }

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestParam Long id) {
        return ResponseEntity.ok(userService.subscribeUser(id));
    }

    @PostMapping("/subscribeonce")
    public ResponseEntity<?> subscribeOnce(@RequestParam String email) {
        return ResponseEntity.ok(userService.sendRandomRecipeOnce(email));
    }

    @PostMapping("/contactme")
    public ResponseEntity<?> contactMe(@RequestBody ContactRequest contactRequest) {
        return ResponseEntity.ok(userService.contactMe(contactRequest));
    }
}
