package com.blogeditor.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    /**
     * To pass Generated JWT token
     * Pass a message with the token
     */

    private String token;

    private String message;

}
