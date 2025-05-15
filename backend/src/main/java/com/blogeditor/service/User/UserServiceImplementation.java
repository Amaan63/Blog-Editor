package com.blogeditor.service.User;

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
    public User registerUser(User user) {
        return null;
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
        try {
            // Load user details from the database based on the provided email
            UserDetails userDetails = userEmailVerificationService.loadUserByUsername(email);

            // If the provided password does not match the stored encoded password, throw an
            // exception
            if (!passwordEncoder.matches(password, userDetails.getPassword())) {
                throw new Exception("Password didn't match");
            }

            // If both email and password are correct, create and return an Authentication
            // object
            // This Authentication object contains the user details and their authorities
            // (roles/permissions)
            return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        } catch (Exception ex) {
            // If user not found by email
            // If no user is found with the given email, throw an exception indicating
            // invalid username
            throw new Exception("The email " + email + " is not registered");
        }
    }

    @Override
    public User findUserByJwt(String jwt) throws Exception {
        return null;
    }
}
