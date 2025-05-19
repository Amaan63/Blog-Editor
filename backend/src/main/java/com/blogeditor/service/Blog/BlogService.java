package com.blogeditor.service.Blog;

import com.blogeditor.dto.BlogDto;
import com.blogeditor.models.Blogs;
import com.blogeditor.models.User;

import java.util.List;
import java.util.Optional;

public interface BlogService {

    public Blogs saveOrUpdateDraft(BlogDto reqBlog, User user) throws Exception;

    public Blogs publishBlog(BlogDto reqBlog,User user) throws Exception;

    public List<Blogs> getAllBlogs() throws Exception;

    public Optional<Blogs> getBlogsById(Long blogId) throws Exception;

    public String deleteBlog (Long userId , Long blogId) throws Exception;

}
