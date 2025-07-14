package com.traexcohomestay.hoteltraexco.controller;

import ch.qos.logback.classic.Logger;
import com.traexcohomestay.hoteltraexco.dto.*;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.security.CustomUserDetails;
import com.traexcohomestay.hoteltraexco.service.AuthService;
import com.traexcohomestay.hoteltraexco.service.BookingServiceImpl;
import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    @Autowired
    private UserDetailsService userDetailsService;
    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(BookingServiceImpl.class);
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }
    @GetMapping("/migrate-passwords")
    public ResponseEntity<String> migratePasswords() {
        authService.migratePasswords();
        return ResponseEntity.ok("Dịch chuyển mật khẩu hoàn tất!");
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request.getEmail());
        return ResponseEntity.ok("Yêu cầu đặt lại mật khẩu đã được gửi thành công!");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok("Mật khẩu đã được đặt lại thành công!");
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@Valid @RequestBody GoogleAuthRequest request) {
        return ResponseEntity.ok(authService.googleLogin(request.getToken()));
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof CustomUserDetails) {
            return ResponseEntity.ok(((CustomUserDetails) principal).getUser());
        }
        else if (principal instanceof String) {
            // Trường hợp principal chỉ là username/email
            try {
                UserDetails userDetails = userDetailsService.loadUserByUsername((String) principal);
                if (userDetails instanceof CustomUserDetails) {
                    return ResponseEntity.ok(((CustomUserDetails) userDetails).getUser());
                }
            } catch (UsernameNotFoundException e) {
                logger.warn("Không tìm thấy người dùng cho principal: {}", principal);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new User()); // Hoặc throw exception phù hợp
    }
}