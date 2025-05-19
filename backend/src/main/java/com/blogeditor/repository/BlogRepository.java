package com.blogeditor.repository;

import com.blogeditor.models.Blogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * BlogRepository provides CRUD operations for the Blogs entity.
 * It extends JpaRepository to leverage Spring Data JPA's built-in methods
 * for managing Blogs data in the database.
 */
@Repository
public interface BlogRepository extends JpaRepository<Blogs, Long> {
    // No additional methods are needed here as JpaRepository
    // provides basic CRUD operations by default.
}
