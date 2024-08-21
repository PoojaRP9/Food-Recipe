package org.example.foodiebackend.controller;

import org.example.foodiebackend.payload.request.CommentRequest;
import org.example.foodiebackend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllComments() {
        return ResponseEntity.ok(commentService.getAllComments());
    }

    @PostMapping("add")
    public ResponseEntity<?> addComment(@RequestBody CommentRequest commentRequest) {
        return ResponseEntity.ok(commentService.addComment(commentRequest));
    }
}
