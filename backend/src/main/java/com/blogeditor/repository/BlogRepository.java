package com.blogeditor.repository;

import com.blogeditor.models.Blogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blogs, Long> {
}
