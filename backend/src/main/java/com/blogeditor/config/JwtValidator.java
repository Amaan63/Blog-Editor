// Package declaration
package com.blogeditor.config;

// Import required classes
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// Custom filter that runs once per request to validate JWT tokens
public class JwtValidator extends OncePerRequestFilter {

    // This method gets called automatically once per request
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Extract JWT token from the Authorization header
        String jwt = request.getHeader(JwtConstant.JWT_HEADER);

        // If token exists
        if (jwt != null) {
            try {
                // Extract email from JWT token using JwtProvider
                String email = JwtProvider.getEmailFromJwtToken(jwt);

                // Create an empty list of authorities (roles/permissions)
                List<GrantedAuthority> authorities = new ArrayList<>();

                // Create an authentication object with email as principal
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);

                // Set the authentication object in the SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                // If anything goes wrong (e.g., invalid token), throw exception
                throw new BadCredentialsException("Invalid Token....");
            }
        }

        // Continue the filter chain (let the request proceed)
        filterChain.doFilter(request, response);
    }
}
