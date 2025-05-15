package com.blogeditor.service.User;

import com.blogeditor.models.User;
import org.springframework.security.core.Authentication;

public interface UserService {

    public User registerUser(User user);

    public void checkIfUserExistsByEmail(String email) throws Exception;

    public Authentication authenticate(String email, String password) throws Exception;

    public User findUserByJwt(String jwt) throws Exception;
}
