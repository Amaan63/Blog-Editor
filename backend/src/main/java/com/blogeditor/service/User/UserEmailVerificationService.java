package com.blogeditor.service.User;

import com.blogeditor.models.User;
import com.blogeditor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserEmailVerificationService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    {
        /*
         * - UserDetailsService is an interface provided by Spring Security.
         * - It is used to fetch user-related data (like username, password, roles) from
         * a database or any source.
         * - This is very important when you are building a login system.
         * - When a user tries to log in, Spring Security will call the method
         * loadUserByUsername() of this interface.
         */
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found with email " + username);
        }
        List<GrantedAuthority> authorities = new ArrayList<>();

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }
}
