package com.traexcohomestay.hoteltraexco.security;

import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Collections;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.debug("Loading user by email: {}", email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng với email: " + email));

        if (!user.getStatus()) {
            log.warn("User account is disabled: {}", email);
            throw new org.springframework.security.authentication.DisabledException("Tài khoản đã bị vô hiệu hóa");
        }

        return new CustomUserDetails(user, getAuthorities(user.getRole()));
    }

    @Transactional(readOnly = true)
    public UserDetails loadUserById(Integer id) throws UsernameNotFoundException {
        log.debug("Loading user by ID: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("User not found with ID: {}", id);
                    return new UsernameNotFoundException("Không tìm thấy người dùng với ID: " + id);
                });

        if (!user.getStatus()) {
            log.warn("User account is disabled for ID: {}", id);
            throw new org.springframework.security.authentication.DisabledException("Tài khoản đã bị vô hiệu hóa");
        }

        // Sửa: Trả về CustomUserDetails thay vì User chuẩn
        return new CustomUserDetails(user, getAuthorities(user.getRole()));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(String role) {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
    }
}