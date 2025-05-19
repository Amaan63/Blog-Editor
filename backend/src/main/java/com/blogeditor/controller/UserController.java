// Define the package
package com.blogeditor.controller;

// Import necessary classes
import com.blogeditor.config.JwtProvider;
import com.blogeditor.dto.AuthResponse;
import com.blogeditor.dto.UserDto;
import com.blogeditor.models.User;
import com.blogeditor.service.User.UserServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

// Marks this class as a REST controller
@RestController
// Base URL mapping for all user-related endpoints
@RequestMapping("/user")
public class UserController {

    // Injecting UserServiceImplementation to handle user logic
    @Autowired
    private UserServiceImplementation userServiceImplementation;

    // Endpoint for user registration (sign-up)
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUpUser(@RequestBody UserDto userDto) {
        try {
            // Check if the email is already registered
            userServiceImplementation.checkIfUserExistsByEmail(userDto.getEmail());

            // Register new user
            User savedUser = userServiceImplementation.registerUser(userDto);

            // Create authentication object for JWT generation
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    savedUser.getEmail(),
                    savedUser.getPassword()
            );

            // Generate JWT token for the newly registered user
            String token = JwtProvider.generatedToken(authentication);

            // Create response containing the token and success message
            AuthResponse res = new AuthResponse(token, "Registeration Success");

            // Return response with HTTP status 200 (OK)
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            // If registration fails, return conflict status with error message
            return new ResponseEntity<>(new AuthResponse(null, e.getMessage()), HttpStatus.CONFLICT);
        }
    }

    // Endpoint for user login (sign-in)
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signInUser(@RequestBody UserDto userDto) throws Exception {
        try {
            // Authenticate user using email and password
            Authentication authentication = userServiceImplementation.authenticate(
                    userDto.getEmail(),
                    userDto.getPassword()
            );

            // Generate JWT token on successful authentication
            String token = JwtProvider.generatedToken(authentication);

            // Create response with token and success message
            AuthResponse res = new AuthResponse(token, "Login Success");

            // Return response with HTTP status 200 (OK)
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            // If login fails, return unauthorized status with error message
            return new ResponseEntity<>(new AuthResponse(null, e.getMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

    // Endpoint to retrieve user details from JWT token
    @GetMapping("/token-to-user")
    public ResponseEntity<?> tokenToUser(@RequestHeader("Authorization") String jwt) throws Exception {
        try {
            // Extract user details from JWT token
            User user = userServiceImplementation.findUserByJwt(jwt);

            // Return user object with HTTP status 200 (OK)
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (BadCredentialsException e) {
            // If token is invalid or user not found, return unauthorized status
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
}
