package ru.aleksandrov.backendinternetnewspaper.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.aleksandrov.backendinternetnewspaper.dto.model.CommentDto;
import ru.aleksandrov.backendinternetnewspaper.models.Comment;
import ru.aleksandrov.backendinternetnewspaper.security.services.UserDetailsImpl;
import ru.aleksandrov.backendinternetnewspaper.services.CommentService;
import ru.aleksandrov.backendinternetnewspaper.utils.MappingUtil;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/comment")
public class CommentController {

    private final CommentService commentService;
    private final MappingUtil mappingUtil;

    @Autowired
    public CommentController(CommentService commentService, MappingUtil mappingUtil) {
        this.commentService = commentService;
        this.mappingUtil = mappingUtil;
    }

    @GetMapping("/show")
    public ResponseEntity<List<CommentDto>> getCommentsForNews(@RequestParam("newsId") Integer newsId) {
        List<CommentDto> commentDto = commentService.getThreeComments(newsId);
        return new ResponseEntity<>(commentDto, HttpStatus.OK);
    }

    @PostMapping("/check-db")
    public ResponseEntity<Map<String, Integer>> checkExistComment(@RequestParam("newsId") Integer newsId) {
        Map<String, Integer> countComment = new HashMap<>();
        countComment.put("countComment", commentService.getCountComments(newsId));
        return new ResponseEntity<>(countComment, HttpStatus.OK);
    }

    @PostMapping("/save")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<CommentDto> saveComment(@AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
                                                  @RequestParam("newsId") Integer newsId,
                                                  @RequestBody @Valid CommentDto commentDTO) {
        Comment newComment = mappingUtil.convertToComment(commentDTO);
        Comment savedComment = commentService.saveComment(userDetailsImpl, newComment, newsId);
        CommentDto savedCommentDto = commentService.convertToCommentDto(savedComment);
        return new ResponseEntity<>(savedCommentDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/user/{commentId}")  
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<HttpStatus> userDeleteComment(@AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
                                                        @PathVariable("commentId") Integer commentId) {
        commentService.deleteUserComment(userDetailsImpl, commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/admin/{commentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> adminDeleteComment(@PathVariable("commentId") Integer commentId) {
        commentService.deleteCommentById(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
