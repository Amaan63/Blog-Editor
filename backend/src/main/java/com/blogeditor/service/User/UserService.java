package com.blogeditor.service.User;

import com.blogeditor.dto.UserDto;
import com.blogeditor.models.User;
import org.springframework.security.core.Authentication;

/**
 * UserService interface defines the contract for
 * user registration, authentication, and user-related operations.
 */
public interface UserService {

    /**
     * Registers a new user with the provided user data.
     *
     * @param userDto The DTO containing user details.
     * @return The saved User entity.
     */
    public User registerUser(UserDto userDto);

    /**
     * Checks if a user already exists with the provided email.
     *
     * @param email The email to check.
     * @throws Exception If the email is already registered.
     */
    public void checkIfUserExistsByEmail(String email) throws Exception;

    /**
     * Authenticates the user with email and password.
     *
     * @param email The user's email.
     * @param password The user's password.
     * @return An Authentication object if credentials are valid.
     * @throws Exception If email is not found or password is incorrect.
     */
    public Authentication authenticate(String email, String password) throws Exception;

    /**
     * Extracts user information from the given JWT token.
     *
     * @param jwt The JWT token.
     * @return The User entity associated with the token.
     * @throws Exception If the token is invalid or user not found.
     */
    public User findUserByJwt(String jwt) throws Exception;
}
