package com.traexcohomestay.hoteltraexco.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Key;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final UserDetailsService userDetailsService;
    private final Key signingKey;

    @Autowired
    public JwtAuthenticationFilter(UserDetailsService userDetailsService, @Qualifier("jwtSigningKey") Key signingKey) {
        this.userDetailsService = userDetailsService;
        this.signingKey = signingKey;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {

                Claims claims = Jwts.parser()
                        .setSigningKey(signingKey)
                        .parseClaimsJws(token)
                        .getBody();
                log.debug("Authorization header: {}", header);
                log.debug("Parsed token: {}", token);
                log.debug("JWT claims: {}", claims);
                String email = claims.getSubject();
                log.debug("Email from token: {}", email);
                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                    // Thêm log và try-catch cho ép kiểu
                    try {
                        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                customUserDetails, null, customUserDetails.getAuthorities());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        log.debug("Authentication set for user: {}", email);
                    } catch (ClassCastException e) {
                        log.error("Failed to cast UserDetails to CustomUserDetails. Actual type: {}", userDetails.getClass().getName(), e);
                        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Lỗi nội bộ: UserDetails không đúng loại");
                        return;
                    }
                }
            } catch (JwtException e) {
                log.warn("Invalid JWT token: {}", e.getMessage());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token: " + e.getMessage());
                return;
            } catch (Exception e) {
                log.error("Unexpected error in JWT filter: {}", e.getMessage(), e);
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Lỗi nội bộ trong filter: " + e.getMessage());
                return;
            }
        }

        chain.doFilter(request, response);
    }
}