package com.blogeditor.controller;

import com.blogeditor.dto.BlogDto;
import com.blogeditor.models.Blogs;
import com.blogeditor.models.User;
import com.blogeditor.service.Blog.BlogServiceImplementation;
import com.blogeditor.service.User.UserServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/blogs")
public class BlogController {

    @Autowired
    private BlogServiceImplementation blogServiceImplementation;

    @Autowired
    private UserServiceImplementation userServiceImplementation;

    @PostMapping("/save-draft")
    public ResponseEntity<?> saveOrUpdateDraft(@RequestBody BlogDto blogDto,@RequestHeader("Authorization") String jwt) throws Exception {
        try {
            User user = userServiceImplementation.findUserByJwt(jwt);
            Blogs blog = blogServiceImplementation.saveOrUpdateDraft(blogDto,user);
            return ResponseEntity.ok(blog);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to create blog: " + e.getMessage());
        }
    }

    @PostMapping("/publish")
    public ResponseEntity<?> publishBlog(@RequestBody BlogDto blogDto,@RequestHeader("Authorization") String jwt) throws Exception {
        try {
            User user = userServiceImplementation.findUserByJwt(jwt);
            Blogs blog = blogServiceImplementation.publishBlog(blogDto,user);
            return ResponseEntity.ok(blog);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to create blog: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Blogs>> getAllBlogs() throws Exception {
        return ResponseEntity.ok(blogServiceImplementation.getAllBlogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Blogs>> getBlogById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(blogServiceImplementation.getBlogsById(id));
    }
}

