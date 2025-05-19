package com.blogeditor.repository;

import com.blogeditor.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * UserRepository provides CRUD operations for the User entity.
 * It extends JpaRepository to leverage Spring Data JPA's built-in methods.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a user in the database by their email address.
     *
     * @param email The email of the user to find.
     * @return The User object if found, otherwise null.
     */
    public User findByEmail(String email);
}
