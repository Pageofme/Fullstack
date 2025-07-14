package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "Payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Column(name = "amount", precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "payment_method", length = 50)
    private String paymentMethod;

    @ColumnDefault("getdate()")
    @Column(name = "payment_date")
    private Instant paymentDate;

    @Column(name = "status", length = 20)
    private String status; // PENDING, APPROVED, REJECTED

    @Column(name = "payment_details", columnDefinition = "TEXT")
    private String paymentDetails;
    @Column(name = "is_deposit")
    private Boolean isDeposit;
}