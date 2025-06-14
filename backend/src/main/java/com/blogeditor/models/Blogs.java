package com.blogeditor.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entity class representing a Blog post.
 * Maps to a database table for storing blog details.
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Blogs {

    /**
     * Primary key of the blog entity.
     * Value is auto-generated by the database.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Title of the blog post.
     */
    private String title;

    /**
     * Content of the blog post.
     * Stored as TEXT in the database to allow long content.
     */
    @Column(columnDefinition = "TEXT")
    private String content;

    /**
     * Tags associated with the blog post.
     * Could be a comma-separated string or similar.
     */
    private String tags;

    /**
     * Status of the blog post.
     * Uses the Status enum to indicate whether the blog is a DRAFT or PUBLISHED.
     */
    @Enumerated(EnumType.STRING)
    private Status status;

    /**
     * Timestamp indicating when the blog was created.
     */
    private LocalDateTime createdAt;

    /**
     * Timestamp indicating the last time the blog was updated.
     */
    private LocalDateTime updatedAt;

    /**
     * Many-to-One relationship to the User entity.
     * Each blog post is associated with one user (author).
     * The foreign key column is 'user_id' and cannot be null.
     */
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
