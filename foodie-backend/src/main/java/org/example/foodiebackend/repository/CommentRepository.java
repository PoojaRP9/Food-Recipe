package org.example.foodiebackend.repository;

import org.example.foodiebackend.model.Comment;
import org.example.foodiebackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByOrderByDateAsc();
}
