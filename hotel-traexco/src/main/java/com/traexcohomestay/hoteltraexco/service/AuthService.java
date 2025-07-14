package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface AuthService {
    AuthResponse login(AuthRequest request);
    AuthResponse register(RegisterRequest request);
    void forgotPassword(String email);
    void resetPassword(ResetPasswordRequest request);
    AuthResponse googleLogin(String idTokenString);
    void migratePasswords();
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}