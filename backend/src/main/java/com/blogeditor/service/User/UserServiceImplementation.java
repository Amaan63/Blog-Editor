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
public class UserServiceImplementation implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserEmailVerificationService userEmailVerificationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(UserDto userDto) {
        User newUser = new User();
        newUser.setEmail(userDto.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        newUser.setUsername(userDto.getUsername());
        return userRepository.save(newUser);
    }

    @Override
    public void checkIfUserExistsByEmail(String email) throws Exception {
        // Check if a user already exists with the given email
        User isExist = userRepository.findByEmail(email);

        // If the email is already used, throw an exception
        if (isExist != null) {
            throw new Exception("This email is already used with another account");
        }
    }

    @Override
    public Authentication authenticate(String email, String password) throws Exception {
        if (email == null || email.trim().isEmpty()) {
            throw new Exception("Email is required, Cannot Be Null");
        }

        // Load user details from the database based on the provided email
        UserDetails userDetails;

        try {
            userDetails = userEmailVerificationService.loadUserByUsername(email);
        } catch (Exception e) {
            throw new Exception("The email " + email + " is not registered");
        }

        // Check if password matches
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new Exception("Password didn't match");
        }

        // If both email and password are correct, return Authentication object
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @Override
    public User findUserByJwt(String jwt) throws Exception {
        try {
            String email = JwtProvider.getEmailFromJwtToken(jwt);

            if (email == null || email.isEmpty()) {
                throw new Exception("Invalid JWT token. Email not found.");
            }

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
