package com.blogeditor.service.Blog;

import com.blogeditor.dto.BlogDto;
import com.blogeditor.models.Blogs;

import java.util.List;

public interface BlogService {

    public Blogs saveOrUpdateDraft(BlogDto reqBlog) throws Exception;

    public Blogs publishBlog(BlogDto reqBlog) throws Exception;

    public List<Blogs> getAllBlogs() throws Exception;

    public List<Blogs> getBlogsByUserId(Long userId) throws Exception;

}
