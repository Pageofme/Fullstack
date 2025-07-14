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
public class Revenue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "revenue_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "homestay_id")
    private Homestay homestay;

    @Column(name = "period_type", length = 10)
    private String periodType;

    @Column(name = "\"year\"")
    private Integer year;

    @Column(name = "\"month\"")
    private Integer month;

    @Column(name = "week")
    private Integer week;

    @Column(name = "total_revenue", precision = 15, scale = 2)
    private BigDecimal totalRevenue;

    @ColumnDefault("getdate()")
    @Column(name = "created_at")
    private Instant createdAt;

}