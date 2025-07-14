package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "homestay_id", referencedColumnName = "homestay_id"),
            @JoinColumn(name = "room_number", referencedColumnName = "room_number")
    })
    private Room rooms;

    @Column(name = "check_in_date")
    private LocalDate checkInDate;

    @Column(name = "check_out_date")
    private LocalDate checkOutDate;

    @ColumnDefault("0")
    @Column(name = "adults")
    private Integer adults;

    @ColumnDefault("0")
    @Column(name = "children")
    private Integer children;

    @ColumnDefault("0")
    @Column(name = "total_people")
    private Integer totalPeople;

    @Column(name = "total_amount", precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "status", length = 20)
    private String status;

    @ColumnDefault("getdate()")
    @Column(name = "created_at")
    private Instant createdAt;
    @OneToMany(mappedBy = "booking", fetch = FetchType.LAZY)
    private Set<BookingService> bookingServices;
}