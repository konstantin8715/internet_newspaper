package ru.aleksandrov.backendinternetnewspaper.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.aleksandrov.backendinternetnewspaper.models.News;
import ru.aleksandrov.backendinternetnewspaper.models.User;
import ru.aleksandrov.backendinternetnewspaper.security.services.UserDetailsImpl;
import ru.aleksandrov.backendinternetnewspaper.services.LikesService;
import ru.aleksandrov.backendinternetnewspaper.services.NewsService;
import ru.aleksandrov.backendinternetnewspaper.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/likes")
public class LikesController {

    private final NewsService newsService;
    private final LikesService likesService;
    private final UserService userService;

    @Autowired
    public LikesController(NewsService newsService, LikesService likesService, UserService userService) {
        this.newsService = newsService;
        this.likesService = likesService;
        this.userService = userService;
    }

    @PostMapping("/save")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> saveLike(@AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
                                     @RequestParam("newsId") int newsId) {
        User user = userService.getUserById(userDetailsImpl.getId());
        News news = newsService.getNewsById(newsId);
        likesService.saveLike(news, user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteLike(@AuthenticationPrincipal UserDetailsImpl userDetailsImpl,
                                        @RequestParam("newsId") int newsId) {
        News news = newsService.getNewsById(newsId);
        User user = userService.getUserById(userDetailsImpl.getId());
        likesService.deleteLike(news, user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
