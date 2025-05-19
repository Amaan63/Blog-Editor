// Package declaration
package com.blogeditor.service.Blog;

// Import required classes
import com.blogeditor.dto.BlogDto;
import com.blogeditor.models.Blogs;
import com.blogeditor.models.Status;
import com.blogeditor.models.User;
import com.blogeditor.repository.BlogRepository;
import com.blogeditor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

// Marks this class as a Spring Service
@Service
public class BlogServiceImplementation implements BlogService {

    // Injects BlogRepository for blog-related database operations
    @Autowired
    private BlogRepository blogRepository;

    // Injects UserRepository to fetch user data
    @Autowired
    private UserRepository userRepository;

    // Saves or updates a blog as a draft
    @Override
    public Blogs saveOrUpdateDraft(BlogDto reqBlog, User user) throws Exception {
        Blogs blog;

        if (reqBlog.getBlogId() != null) {
            // If blogId is present, fetch and update the existing blog
            blog = blogRepository.findById(reqBlog.getBlogId())
                    .orElseThrow(() -> new Exception("Blog not found with id: " + reqBlog.getBlogId()));

            // Ensure the current user is the owner of the blog
            if (!blog.getUser().getEmail().equals(user.getEmail())) {
                throw new Exception("You cannot edit another user's blog");
            }
        } else {
            // If blogId is not present, create a new blog instance
            blog = new Blogs();
            blog.setCreatedAt(LocalDateTime.now());

            // Set the user for the new blog
            blog.setUser(userRepository.findById(user.getId())
                    .orElseThrow(() -> new Exception("User not found")));
        }

        // Set common fields (title, content, tags, status, etc.)
        blog.setTitle(reqBlog.getTitle());
        blog.setContent(reqBlog.getContent());
        blog.setTags(reqBlog.getTags());
        blog.setStatus(Status.DRAFT); // Set blog status to DRAFT
        blog.setUpdatedAt(LocalDateTime.now());

        // Save or update the blog in the database
        return blogRepository.save(blog);
    }

    // Publishes a new blog or updates an existing one to published status
    @Override
    public Blogs publishBlog(BlogDto reqBlog, User user) throws Exception {
        Blogs blog;

        if (reqBlog.getBlogId() != null) {
            // Update existing blog
            blog = blogRepository.findById(reqBlog.getBlogId())
                    .orElseThrow(() -> new Exception("Blog not found with id: " + reqBlog.getBlogId()));
        } else {
            // Create a new blog
            blog = new Blogs();
            blog.setCreatedAt(LocalDateTime.now());

            // Set the user for the blog
            User dbUser = userRepository.findById(user.getId())
                    .orElseThrow(() -> new Exception("User not found"));
            blog.setUser(dbUser);
        }

        // Set fields and change status to PUBLISHED
        blog.setTitle(reqBlog.getTitle());
        blog.setContent(reqBlog.getContent());
        blog.setTags(reqBlog.getTags());
        blog.setStatus(Status.PUBLISHED); // Set blog status to PUBLISHED
        blog.setUpdatedAt(LocalDateTime.now());

        // Save to the database
        return blogRepository.save(blog);
    }

    // Fetches all blogs from the database
    @Override
    public List<Blogs> getAllBlogs() throws Exception {
        return blogRepository.findAll();
    }

    // Fetches a specific blog by its ID
    @Override
    public Optional<Blogs> getBlogsById(Long blogId) throws Exception {
        Optional<Blogs> blogs = blogRepository.findById(blogId);
        if (blogs.isEmpty()) {
            throw new Exception("No blogs found for the given ID: " + blogId);
        }
        return blogs;
    }

    // Deletes a blog only if it belongs to the specified user
    @Override
    public String deleteBlog(Long userId, Long blogId) throws Exception {
        // Retrieve blog by ID
        Optional<Blogs> optionalBlog = blogRepository.findById(blogId);

        if (!optionalBlog.isPresent()) {
            throw new Exception("Blog not found with ID: " + blogId);
        }

        Blogs blog = optionalBlog.get();

        // Validate blog ownership
        if (!blog.getUser().getId().equals(userId)) {
            throw new Exception("You are not authorized to delete this blog.");
        }

        // Delete the blog from the database
        blogRepository.deleteById(blogId);

        return "Blog deleted successfully.";
    }
}
