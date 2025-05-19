// Package declaration
package com.blogeditor.config;

// Import required for working with dates
import java.util.Date;

// Import for working with secret keys for signing JWT
import javax.crypto.SecretKey;

// Spring Security interface to get authenticated user details
import org.springframework.security.core.Authentication;

// Imports from the JJWT library to create and parse JWT tokens
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

// Class responsible for generating and validating JWT tokens
public class JwtProvider {

    // Secret key used for signing the JWT token
    private static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    // Method to generate JWT token using user authentication details
    public static String generatedToken(Authentication auth) {
        return Jwts.builder()
                // Set the issuer of the token (your app name or identifier)
                .setIssuer("Amaan")
                // Set the issue time to current date/time
                .setIssuedAt(new Date())
                // Set the expiration time to 24 hours from now (86400000 ms = 24 hours)
                .setExpiration(new Date(new Date().getTime() + 86400000))
                // Add custom claim: include the authenticated user's email (or username)
                .claim("email", auth.getName())
                // Sign the token with the secret key
                .signWith(key)
                // Compact the token into a string format
                .compact();
    }

    // Method to extract email (username) from a JWT token
    public static String getEmailFromJwtToken(String jwt) {
        // Remove "Bearer " prefix from the token if it's passed with it
        jwt = jwt.substring(7);

        // Parse the JWT using the secret key and retrieve the claims (payload)
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

        // Extract the "email" claim from the token and return it
        String email = String.valueOf(claims.get("email"));
        return email;
    }
}
