package com.blogeditor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    /**
     * Data Transfer Object (DTO) for User.
     *
     * Used to transfer user data between client and server layers
     * without exposing the full User entity.
     *
     * Typically contains only the fields required for user registration,
     * login, or profile update.
     */

    private String email;

    private String password;

    private String username;

}
