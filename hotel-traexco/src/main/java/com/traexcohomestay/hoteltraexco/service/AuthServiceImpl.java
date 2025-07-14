package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.AuthRequest;
import com.traexcohomestay.hoteltraexco.dto.AuthResponse;
import com.traexcohomestay.hoteltraexco.dto.RegisterRequest;
import com.traexcohomestay.hoteltraexco.dto.ResetPasswordRequest;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.traexcohomestay.hoteltraexco.security.CustomUserDetails;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;
    private final Key signingKey;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JavaMailSender mailSender,
                           @Qualifier("jwtSigningKey") Key signingKey) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
        this.signingKey = signingKey;
    }

    /* --------------------------------------------------- */
    /*                  AUTHENTICATION                     */
    /* --------------------------------------------------- */

    @Override
    public AuthResponse login(AuthRequest request) {
        try {
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Email hoặc mật khẩu không đúng"));

            // Kiểm tra kiểu mật khẩu
            String storedPassword = user.getPassword();
            if (storedPassword != null && !storedPassword.startsWith("$2a$") &&
                    !storedPassword.startsWith("$2b$") && !storedPassword.startsWith("$2y$")) {
                throw new RuntimeException("Tài khoản này có mật khẩu không hợp lệ. Vui lòng đặt lại mật khẩu.");
            }

            if (!passwordEncoder.matches(request.getPassword(), storedPassword)) {
                throw new RuntimeException("Email hoặc mật khẩu không đúng");
            }


            String token = generateJwtToken(user);
            return new AuthResponse(token, normalizeRole(user.getRole()));
        } catch (Exception e) {
            throw new RuntimeException("Lỗi đăng nhập: " + e.getMessage());
        }
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        try {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new RuntimeException("Email đã tồn tại");
            }

            User user = new User();
            user.setUserName(request.getUserName());
            user.setFullName(request.getFullName());
            user.setEmail(request.getEmail());
            user.setPhone(request.getPhone());
            user.setBirthdate(request.getBirthdate());
            user.setAddress(request.getAddress());
            user.setRole("USER");
            user.setStatus(true);
            user.setPassword(passwordEncoder.encode(request.getPassword()));

            userRepository.save(user);

            String token = generateJwtToken(user);
            return new AuthResponse(token, "USER");
        } catch (Exception e) {
            throw new RuntimeException("Lỗi đăng ký: " + e.getMessage());
        }
    }

    /* --------------------------------------------------- */
    /*                   PASSWORD RESET                    */
    /* --------------------------------------------------- */

    @Override
    public void forgotPassword(String email) {
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Email không tồn tại"));

            String resetToken = UUID.randomUUID().toString();
            user.setResetToken(resetToken);
            user.setResetTokenExpiry(LocalDateTime.now().plusHours(1)); // Hết hạn sau 1 giờ
            userRepository.save(user);

            sendResetPasswordEmail(user.getEmail(), resetToken);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi gửi yêu cầu đặt lại mật khẩu: " + e.getMessage());
        }
    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {
        try {
            User user = userRepository.findByResetToken(request.getToken())
                    .orElseThrow(() -> new RuntimeException("Token không hợp lệ hoặc đã hết hạn"));

            if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Token đã hết hạn");
            }

            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            user.setResetToken(null);
            user.setResetTokenExpiry(null);
            userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi đặt lại mật khẩu: " + e.getMessage());
        }
    }

    /* --------------------------------------------------- */
    /*                 GOOGLE AUTH LOGIN                   */
    /* --------------------------------------------------- */

    @Override
    public AuthResponse googleLogin(String idTokenString) {
        try {
            JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jsonFactory)
                    .setAudience(Collections.singletonList("736882827867-gjjrd24l8vofkj87nhe8kt1q0d7t9ako.apps.googleusercontent.com"))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken == null) throw new RuntimeException("Token Google không hợp lệ");

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");

            User user = userRepository.findByEmail(email)
                    .orElseGet(() -> {
                        User newUser = new User();
                        newUser.setUserName(email.split("@")[0]);
                        newUser.setFullName(name);
                        newUser.setEmail(email);
                        newUser.setRole("USER");
                        newUser.setStatus(true);
                        newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                        return userRepository.save(newUser);
                    });

            String token = generateJwtToken(user);
            return new AuthResponse(token, "USER");
        } catch (GoogleJsonResponseException e) {
            throw new RuntimeException("Đăng nhập Google thất bại: " + e.getMessage());
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    /* --------------------------------------------------- */
    /*                  MIGRATION TOOL                     */
    /* --------------------------------------------------- */

    public void migratePasswords() {
        List<User> users = userRepository.findAll();
        int updatedCount = 0;
        for (User user : users) {
            String currentPassword = user.getPassword();
            if (currentPassword != null && !currentPassword.startsWith("$2a$") &&
                    !currentPassword.startsWith("$2b$") && !currentPassword.startsWith("$2y$")) {
                user.setPassword(passwordEncoder.encode(currentPassword));
                userRepository.save(user);
                updatedCount++;
            }
        }
        System.out.println("Hoàn tất dịch chuyển. Đã cập nhật " + updatedCount + " mật khẩu.");
    }

    /* --------------------------------------------------- */
    /*                   HELPER METHODS                    */
    /* --------------------------------------------------- */

    private String generateJwtToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", normalizeRole(user.getRole()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86_400_000)) // 24h
                .signWith(signingKey, SignatureAlgorithm.HS512)
                .compact();
    }

    private String normalizeRole(String rawRole) {
        return rawRole == null ? "" : rawRole.toUpperCase();
    }

    private void sendResetPasswordEmail(String email, String token) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject("Yêu cầu đặt lại mật khẩu");
            helper.setText("Để đặt lại mật khẩu, vui lòng nhấp vào liên kết dưới đây:\n" +
                    "http://localhost:3000/reset-password?token=" + token + "\n" +
                    "Liên kết này sẽ hết hạn vào " + new Date(System.currentTimeMillis() + 3_600_000));
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Gửi email đặt lại mật khẩu thất bại: " + e.getMessage());
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = userRepository.findByEmail(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng với email: " + username));

            if (!user.getStatus()) {
                throw new org.springframework.security.authentication.DisabledException("Tài khoản đã bị vô hiệu hóa");
            }

            return new CustomUserDetails(user, getAuthorities(user.getRole()));
        } catch (Exception e) {
            throw new UsernameNotFoundException("Lỗi khi tải thông tin người dùng", e);
        }
    }

    private Collection<? extends GrantedAuthority> getAuthorities(String role) {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
    }
}