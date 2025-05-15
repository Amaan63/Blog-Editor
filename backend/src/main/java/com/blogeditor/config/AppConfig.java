package com.blogeditor.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class AppConfig {

    @Bean // Compulsory to Annotate with Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/user/**").permitAll()// Allow POST /public to be publicly accessible for creating user
                        .requestMatchers("/blogs/**").authenticated()// Block all the /private and require authentication
                        .anyRequest().permitAll())
                //.addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class)
                .csrf(csf -> csf.disable());
                //.cors(cors -> cors.configurationSource(corsConfigurationSource()));
        return http.build();
    }

}
