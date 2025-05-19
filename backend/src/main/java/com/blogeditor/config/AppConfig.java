// Package declaration for the configuration class
package com.blogeditor.config;

// Importing required classes for CORS, HTTP requests, security, etc.
import jakarta.annotation.Nullable;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

// Marks this class as a configuration class for Spring
@Configuration
// Enables Spring Security in the application
@EnableWebSecurity
public class AppConfig {

    // Defines a Spring bean for SecurityFilterChain
    @Bean // Compulsory to Annotate with Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Configure stateless session management (no session is stored on the server)
        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Configure authorization rules
                .authorizeHttpRequests(authorize -> authorize
                        // Allow all requests to /user/** without authentication (like registration/login)
                        .requestMatchers("/user/**").permitAll()
                        // Require authentication for all requests to /blogs/**
                        .requestMatchers("/blogs/**").authenticated()
                        // Allow all other requests without authentication
                        .anyRequest().permitAll())

                // Add custom JWT validator filter before Spring's BasicAuthenticationFilter
                .addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class)

                // Enable CORS and provide configuration source
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Disable CSRF protection (usually disabled for APIs)
                .csrf(csf -> csf.disable());

        // Build and return the configured SecurityFilterChain
        return http.build();
    }

    // Provides a CORS configuration source
    private CorsConfigurationSource corsConfigurationSource() {
        return new CorsConfigurationSource() {

            // Override method to define CORS settings
            @Override
            @Nullable
            public CorsConfiguration getCorsConfiguration(HttpServletRequest arg0) {
                CorsConfiguration cfg = new CorsConfiguration();

                // Allow requests from this origin (e.g., your frontend running on Vite)
                cfg.setAllowedOrigins(Arrays.asList("http://localhost:5173"));

                // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
                cfg.setAllowedMethods(Collections.singletonList("*"));

                // Allow sending credentials (cookies, authorization headers, etc.)
                cfg.setAllowCredentials(true);

                // Allow all headers in requests
                cfg.setAllowedHeaders(Collections.singletonList("*"));

                // Expose the Authorization header to the frontend
                cfg.setExposedHeaders(Arrays.asList("Authorization"));

                // Set max age for preflight request cache
                cfg.setMaxAge(3600L);

                return cfg;
            }
        };
    }

    // Define a PasswordEncoder bean using BCrypt for encoding passwords
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
