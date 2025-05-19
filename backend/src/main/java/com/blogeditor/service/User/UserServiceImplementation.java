package com.blogeditor.service.User;

import com.blogeditor.config.JwtProvider;
import com.blogeditor.dto.UserDto;
import com.blogeditor.models.User;
import com.blogeditor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserEmailVerificationService userEmailVerificationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Registers a new user with encrypted password
     * and saves the user into the database.
     */
    @Override
    public User registerUser(UserDto userDto) {
        User newUser = new User();
        newUser.setEmail(userDto.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDto.getPassword())); // Encrypting the password
        newUser.setUsername(userDto.getUsername());
        return userRepository.save(newUser); // Saving new user to DB
    }

    /**
     * Checks if a user already exists with the given email.
     * If exists, throws an exception.
     */
    @Override
    public void checkIfUserExistsByEmail(String email) throws Exception {
        User isExist = userRepository.findByEmail(email);
        if (isExist != null) {
            throw new Exception("This email is already used with another account");
        }
    }

    /**
     * Authenticates the user using provided email and password.
     * Validates email existence and password match.
     */
    @Override
    public Authentication authenticate(String email, String password) throws Exception {
        if (email == null || email.trim().isEmpty()) {
            throw new Exception("Email is required, Cannot Be Null");
        }

        // Load user by email
        UserDetails userDetails;
        try {
            userDetails = userEmailVerificationService.loadUserByUsername(email);
        } catch (Exception e) {
            throw new Exception("The email " + email + " is not registered");
        }

        // Match raw password with encoded password
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new Exception("Password didn't match");
        }

        // Return Spring Security Authentication object
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    /**
     * Extracts user information from the JWT token
     * and fetches the corresponding user from the database.
     */
    @Override
    public User findUserByJwt(String jwt) throws Exception {
        try {
            String email = JwtProvider.getEmailFromJwtToken(jwt); // Extract email from JWT

            if (email == null || email.isEmpty()) {
                throw new Exception("Invalid JWT token. Email not found.");
            }

            // Find user by email
            User user = userRepository.findByEmail(email);
            if (user == null) {
                throw new Exception("User not found for email: " + email);
            }

            return user;
        } catch (Exception e) {
            // Optional: log the error for debugging
            throw new Exception("Error while extracting user from JWT: " + e.getMessage());
        }
    }
}
