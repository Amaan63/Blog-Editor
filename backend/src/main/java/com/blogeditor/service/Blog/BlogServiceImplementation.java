package com.blogeditor.service.Blog;

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

@Service
public class BlogServiceImplementation implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository; // Assuming you need to set the user

    @Override
    public Blogs saveOrUpdateDraft(BlogDto reqBlog, User user) throws Exception {
        Blogs blog;

        if (reqBlog.getBlogId() != null) {
            // Try to fetch and update existing blog
            blog = blogRepository.findById(reqBlog.getBlogId())
                    .orElseThrow(() -> new Exception("Blog not found with id: " + reqBlog.getBlogId()));

            // Check if the logged-in user is the owner of the blog
            if (!blog.getUser().getEmail().equals(user.getEmail())) {
                throw new Exception("You cannot edit another user's blog");
            }
        } else {
            // Create new blog
            blog = new Blogs();
            blog.setCreatedAt(LocalDateTime.now());

            // Set user on new blog
            blog.setUser(userRepository.findById(user.getId())
                    .orElseThrow(() -> new Exception("User not found")));
        }

        // Set/update common fields
        blog.setTitle(reqBlog.getTitle());
        blog.setContent(reqBlog.getContent());
        blog.setTags(reqBlog.getTags());
        blog.setStatus(Status.DRAFT);
        blog.setUpdatedAt(LocalDateTime.now());

        return blogRepository.save(blog);
    }




    @Override
    public Blogs publishBlog(BlogDto reqBlog, User user) throws Exception {
        Blogs blog;

        if (reqBlog.getBlogId() != null) {
            // Update existing blog
            blog = blogRepository.findById(reqBlog.getBlogId())
                    .orElseThrow(() -> new Exception("Blog not found with id: " + reqBlog.getBlogId()));
        } else {
            // Create new blog
            blog = new Blogs();
            blog.setCreatedAt(LocalDateTime.now());

            // Set user for new blog
            User dbUser = userRepository.findById(user.getId())
                    .orElseThrow(() -> new Exception("User not found"));
            blog.setUser(dbUser);
        }

        // Common fields for both create and update
        blog.setTitle(reqBlog.getTitle());
        blog.setContent(reqBlog.getContent());
        blog.setTags(reqBlog.getTags());
        blog.setStatus(Status.PUBLISHED);
        blog.setUpdatedAt(LocalDateTime.now());

        return blogRepository.save(blog);
    }


    @Override
    public List<Blogs> getAllBlogs() throws Exception {
        return blogRepository.findAll();
    }

    @Override
    public Optional<Blogs> getBlogsById(Long blogId) throws Exception {
        Optional<Blogs> blogs = blogRepository.findById(blogId);
        if (blogs.isEmpty()) {
            throw new Exception("No blogs found for the given ID: " + blogId);
        }
        return blogs;
    }

    @Override
    public String deleteBlog(Long userId, Long blogId) throws Exception {
        // Fetch the blog by blogId
        Optional<Blogs> optionalBlog = blogRepository.findById(blogId);

        if (!optionalBlog.isPresent()) {
            throw new Exception("Blog not found with ID: " + blogId);
        }

        Blogs blog = optionalBlog.get();

        // Check if the blog belongs to the user
        if (!blog.getUser().getId().equals(userId)) {
            throw new Exception("You are not authorized to delete this blog.");
        }

        // Proceed to delete
        blogRepository.deleteById(blogId);

        return "Blog deleted successfully.";
    }


}
