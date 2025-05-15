package com.blogeditor.service.User;

import com.blogeditor.models.User;
import org.springframework.security.core.Authentication;

public class UserServiceImplementation implements UserService{
    @Override
    public User registerUser(User user) {
        return null;
    }

    @Override
    public void checkIfUserExistsByEmail(String email) throws Exception {

    }

    @Override
    public Authentication authenticate(String email, String password) throws Exception {
        return null;
    }

    @Override
    public User findUserByJwt(String jwt) throws Exception {
        return null;
    }
}
