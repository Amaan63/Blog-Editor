package com.blogeditor.controller;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceImplementation userServiceImplementation;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUpUser(@RequestBody UserDto userDto){
        try{
            // Check if the email already exists using the service method
            userServiceImplementation.checkIfUserExistsByEmail(userDto.getEmail());

            // If email doesn't exist, proceed to register the new user
            User savedUser = userServiceImplementation.registerUser(userDto);

            Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),savedUser.getPassword());

            String token = JwtProvider.generatedToken(authentication);

            AuthResponse res = new AuthResponse(token,"Registeration Success");

            return new ResponseEntity<>(res, HttpStatus.OK); // return AuthResponse, not savedUser
        } catch (Exception e) {
            // Return a bad request response with the exception message if an error occurs
            return new ResponseEntity<>(new AuthResponse(null, e.getMessage()), HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signInUser(@RequestBody UserDto userDto) throws Exception {
        try {
            Authentication authentication = userServiceImplementation.authenticate(userDto.getEmail(), userDto.getPassword());
            String token = JwtProvider.generatedToken(authentication);

            AuthResponse res = new AuthResponse(token, "Login Success");
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (BadCredentialsException e) {
            // If email not found or password mismatch
            return new ResponseEntity<>(new AuthResponse(null, e.getMessage()), HttpStatus.UNAUTHORIZED);

        }
    }
}
