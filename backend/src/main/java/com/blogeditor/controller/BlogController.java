package com.blogeditor.controller;

import com.blogeditor.dto.BlogDto;
import com.blogeditor.service.Blog.BlogServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

//    @Autowired
//    private BlogServiceImplementation blogServiceImplementation;
//
//    @PostMapping("/save-draft")
//    public ResponseEntity<BlogDto> saveOrUpdateDraft(@RequestBody BlogDto blogDto) {
//        return ResponseEntity.ok(blogServiceImplementation.saveOrUpdateDraft(blogDto));
//    }
//
//    @PostMapping("/publish")
//    public ResponseEntity<BlogDto> publishBlog(@RequestBody BlogDto blogDto) throws Exception {
//        return ResponseEntity.ok(blogServiceImplementation.publishBlog(blogDto));
//    }
//
//    @GetMapping
//    public ResponseEntity<List<BlogDto>> getAllBlogs() {
//        return ResponseEntity.ok(blogServiceImplementation.getAllBlogs());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<BlogDto> getBlogById(@PathVariable Long id) {
//        return ResponseEntity.ok(blogServiceImplementation.getBlogById(id));
//    }
}

