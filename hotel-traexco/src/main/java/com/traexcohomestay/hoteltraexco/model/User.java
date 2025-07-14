package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "Users")
public class User {
    @Id
    @Column(name = "user_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "userName", length = 50)
    private String userName;

    @Column(name = "password", length = 100)
    private String password;

    @Nationalized
    @Column(name = "fullName", length = 100)
    private String fullName;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "phone", length = 15)
    private String phone;

    @Column(name = "birthdate")
    private LocalDate birthdate;

    @Nationalized
    @Column(name = "address")
    private String address;

    @Column(name = "role", length = 20)
    private String role;

    @ColumnDefault("1")
    @Column(name = "status")
    private Boolean status;

    @Column(name = "reset_token", length = 36)
    private String resetToken;

    @Column(name = "reset_token_expiry")
    private LocalDateTime resetTokenExpiry;

}