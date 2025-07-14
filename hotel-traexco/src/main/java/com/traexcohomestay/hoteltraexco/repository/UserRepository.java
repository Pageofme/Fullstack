package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByResetToken(String token);

    List<User> findByRole(String role);

    List<User> findByRoleIn(List<String> roles);

    List<User> findByStatus(Boolean status);

    List<User> findByFullNameContainingIgnoreCaseAndRoleIn(String fullName, List<String> roles);

    boolean existsByEmail(String email);

    boolean existsByIdAndStatus(Integer id, Boolean status);

    @Query("SELECT u FROM User u WHERE u.role = 'HOST' AND u.id = :hostId")
    Optional<User> findHostById(@Param("hostId") Integer hostId);

    @Query("SELECT u FROM User u WHERE u.role = 'HOST' AND u.id IN (SELECT h.hostId FROM Homestay h WHERE h.homestayId = :homestayId)")
    Optional<User> findHostByHomestayId(@Param("homestayId") Integer homestayId);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.password = :password WHERE u.id = :userId")
    void updatePassword(@Param("userId") Integer userId, @Param("password") String password);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.resetToken = :token, u.resetTokenExpiry = :expiry WHERE u.email = :email")
    void setPasswordResetToken(@Param("email") String email,
                               @Param("token") String token,
                               @Param("expiry") LocalDateTime expiry);
}