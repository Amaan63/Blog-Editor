// Define the package
package com.blogeditor.controller;

// Import necessary classes
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

// This annotation makes this class a REST controller
@RestController
// Base URL mapping for all blog-related APIs
@RequestMapping("/blogs")
public class BlogController {

    // Injecting BlogServiceImplementation to handle blog-related logic
    @Autowired
    private BlogServiceImplementation blogServiceImplementation;

    // Injecting UserServiceImplementation to handle user-related logic
    @Autowired
    private UserServiceImplementation userServiceImplementation;

    // API to save or update a blog draft
    @PostMapping("/save-draft")
    public ResponseEntity<?> saveOrUpdateDraft(
            @RequestBody BlogDto blogDto, // Incoming blog data from request body
            @RequestHeader("Authorization") String jwt // JWT token from request header
    ) throws Exception {
        try {
            // Find the user from JWT token
            User user = userServiceImplementation.findUserByJwt(jwt);
            // Save or update the blog draft
            Blogs blog = blogServiceImplementation.saveOrUpdateDraft(blogDto, user);
            // Return the saved blog as a response
            return ResponseEntity.ok(blog);
        } catch (Exception e) {
            // Return error response in case of failure
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to create or update blog: " + e.getMessage());
        }
    }

    // API to publish a blog
    @PostMapping("/publish")
    public ResponseEntity<?> publishBlog(
            @RequestBody BlogDto blogDto, // Incoming blog data
            @RequestHeader("Authorization") String jwt // JWT token for authentication
    ) throws Exception {
        try {
            // Find the user based on JWT
            User user = userServiceImplementation.findUserByJwt(jwt);
            // Publish the blog using service
            Blogs blog = blogServiceImplementation.publishBlog(blogDto, user);
            // Return the published blog as response
            return ResponseEntity.ok(blog);
        } catch (Exception e) {
            // Return error if blog creation fails
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to create blog: " + e.getMessage());
        }
    }

    // API to get all blogs
    @GetMapping
    public ResponseEntity<List<Blogs>> getAllBlogs() throws Exception {
        // Get all blogs from service and return as response
        return ResponseEntity.ok(blogServiceImplementation.getAllBlogs());
    }

    // API to get a blog by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Blogs>> getBlogById(
            @PathVariable Long id // Blog ID passed in the URL path
    ) throws Exception {
        // Get the blog by ID and return it
        return ResponseEntity.ok(blogServiceImplementation.getBlogsById(id));
    }

    // API to delete a blog
    @DeleteMapping("/delete/blogId/{blogId}")
    public ResponseEntity<String> deleteBlog(
            @PathVariable Long blogId, // ID of the blog to delete
            @RequestHeader("Authorization") String jwt // JWT for identifying the user
    ) {
        try {
            // Find the user by JWT
            User user = userServiceImplementation.findUserByJwt(jwt);
            // Call the service to delete the blog
            String response = blogServiceImplementation.deleteBlog(user.getId(), blogId);
            // Return the success message
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // If deletion fails, return an error response
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
