package org.example.foodiebackend.service;

import lombok.Setter;
import org.example.foodiebackend.model.Comment;
import org.example.foodiebackend.model.User;
import org.example.foodiebackend.payload.request.CommentRequest;
import org.example.foodiebackend.payload.response.CommentResponse;
import org.example.foodiebackend.payload.response.MessageResponse;
import org.example.foodiebackend.repository.CommentRepository;
import org.example.foodiebackend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserRepository userRepository;
    private ModelMapper modelMapper = new ModelMapper();

    public MessageResponse addComment(CommentRequest commentRequest) {
        Comment comment = new Comment();
        comment.setDate(new Date());
        User user = userRepository.findById(commentRequest.getUserId()).get();
        comment.setUser(user);
        comment.setText(commentRequest.getComment());
        commentRepository.save(comment);
        return new MessageResponse("Comment added");
    }

    public List<CommentResponse> getAllComments() {
        List<Comment> comments = commentRepository.findAllByOrderByDateAsc();
        List<CommentResponse> commentResponses = List.of(modelMapper.map(comments, CommentResponse[].class));
        for (int i = 0; i < commentResponses.size(); i++) {
            commentResponses.get(i).setDate(comments.get(i).getDate().toString());
        }
        return commentResponses;
    }
}
