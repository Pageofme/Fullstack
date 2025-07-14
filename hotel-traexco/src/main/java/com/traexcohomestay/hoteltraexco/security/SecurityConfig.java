package com.traexcohomestay.hoteltraexco.security;

import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Các điểm cuối công khai có thể truy cập bởi tất cả mọi người
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/homestays/**",
                                "/api/rooms/**",
                                "/api/services/**",
                                "/api/service-types/**",
                                "/api/experiences/**",
                                "/api/experience-types/**",
                                "/api/amenities/**",
                                "/api/reviews/**",
                                "/api/cancellation-policies/**",
                                "/api/homestay-rules/**",
                                "/api/chart/**",
                                "/api/payments/callback"
                        ).permitAll()
                        // Yêu cầu xác thực cho /api/bookings
                        .requestMatchers("/api/bookings").hasAnyRole("USER", "ADMIN")
                        .requestMatchers("/api/bookings/homestay/**").hasAnyRole("HOST", "ADMIN")
                        .requestMatchers("/api/users/me").authenticated()
                        .requestMatchers("/api/users/{id}").hasAnyRole("USER", "HOST", "ADMIN")
                        .requestMatchers("/api/notifications/user/{userId}/**").hasAnyRole("USER", "HOST", "ADMIN")
                        .requestMatchers("/api/host/**").hasRole("HOST")
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(userDetailsService, jwtSigningKey());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecretKey jwtSigningKey() {
        String secret = "your-very-long-secret-key-min-64-bytes-for-hs512-like-this-one-here-to-avoid-weak-key-error";
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}