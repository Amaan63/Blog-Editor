package com.blogeditor.service.Blog;

import com.blogeditor.dto.BlogDto;
import com.blogeditor.models.Blogs;
import com.blogeditor.models.User;

import java.util.List;
import java.util.Optional;

/**
 * BlogService interface defines operations for managing blogs such as
 * saving drafts, publishing, retrieving, and deleting blogs.
 */
public interface BlogService {

    /**
     * Creates a new blog draft or updates an existing one.
     *
     * @param reqBlog The blog data transfer object containing the blog's content, title, etc.
     * @param user The user creating or updating the blog.
     * @return The saved or updated blog object.
     * @throws Exception If blog is not found or user is unauthorized.
     */
    public Blogs saveOrUpdateDraft(BlogDto reqBlog, User user) throws Exception;

    /**
     * Publishes a new blog or updates an existing blog's status to PUBLISHED.
     *
     * @param reqBlog The blog data transfer object.
     * @param user The user publishing the blog.
     * @return The published blog object.
     * @throws Exception If blog is not found or user is unauthorized.
     */
    public Blogs publishBlog(BlogDto reqBlog, User user) throws Exception;

    /**
     * Retrieves all blogs from the system.
     *
     * @return A list of all blogs.
     * @throws Exception If no blogs are found or an error occurs.
     */
    public List<Blogs> getAllBlogs() throws Exception;

    /**
     * Retrieves a specific blog by its ID.
     *
     * @param blogId The ID of the blog to retrieve.
     * @return An Optional containing the blog if found.
     * @throws Exception If the blog is not found.
     */
    public Optional<Blogs> getBlogsById(Long blogId) throws Exception;

    /**
     * Deletes a blog if the requesting user is the blog owner.
     *
     * @param userId The ID of the user requesting the deletion.
     * @param blogId The ID of the blog to delete.
     * @return A success message after deletion.
     * @throws Exception If the blog is not found or user is unauthorized.
     */
    public String deleteBlog(Long userId, Long blogId) throws Exception;
}
