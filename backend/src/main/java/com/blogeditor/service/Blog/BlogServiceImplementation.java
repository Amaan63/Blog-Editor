package com.blogeditor.service.Blog;

import com.blogeditor.dto.BlogDto;
import com.blogeditor.models.Blogs;
import com.blogeditor.models.Status;
import com.blogeditor.repository.BlogRepository;
import com.blogeditor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public class BlogServiceImplementation implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository; // Assuming you need to set the user

    @Override
    public Blogs saveOrUpdateDraft(BlogDto reqBlog) throws Exception {
        Blogs blog;

        if (reqBlog.getBlogId() == null) {
            // Create new blog draft
            blog = new Blogs();
            blog.setCreatedAt(LocalDateTime.now());
        } else {
            // Update existing blog draft
            blog = blogRepository.findById(reqBlog.getBlogId())
                    .orElseThrow(() -> new Exception("Blog not found with id: " + reqBlog.getBlogId()));
        }

        // Common fields to set for both create and update
        blog.setTitle(reqBlog.getTitle());
        blog.setContent(reqBlog.getContent());
        blog.setTags(reqBlog.getTags());
        blog.setStatus(Status.DRAFT);
        blog.setUpdatedAt(LocalDateTime.now());

        // Set user only if new (or you can allow updating user if needed)
        // if (blog.getUser() == null) {
        // User user = userRepository.findById(reqBlog.getUserId())
        // .orElseThrow(() -> new Exception("User not found"));
        // blog.setUser(user);
        // }

        return blogRepository.save(blog);
    }

    @Override
    public Blogs publishBlog(BlogDto reqBlog) throws Exception {
        Blogs blog = new Blogs();

        blog.setTitle(reqBlog.getTitle());
        blog.setContent(reqBlog.getContent());
        blog.setTags(reqBlog.getTags());
        blog.setStatus(Status.PUBLISHED);

        LocalDateTime now = LocalDateTime.now();
        blog.setCreatedAt(now);
        blog.setUpdatedAt(now);

        // Set user
//        User user = userRepository.findById(reqBlog.getUserId())
//                .orElseThrow(() -> new Exception("User not found"));
//        blog.setUser(user);

        return blogRepository.save(blog);
    }

    @Override
    public List<Blogs> getAllBlogs() throws Exception {
        return blogRepository.findAll();
    }

    @Override
    public List<Blogs> getBlogsByUserId(Long blogId) throws Exception {
        List<Blogs> blogs = blogRepository.findByBlogsId(blogId);
        if (blogs.isEmpty()) {
            throw new Exception("No blogs found for user ID: " + blogId);
        }
        return blogs;
    }
}
