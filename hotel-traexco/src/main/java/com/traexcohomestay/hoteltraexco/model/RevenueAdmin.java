package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
public class RevenueAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "revenueAdmin_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "revenue_id")
    private Revenue revenue;

    @Column(name = "profitPercentage", precision = 4, scale = 2)
    private BigDecimal profitPercentage;

    @Column(name = "revenue", precision = 15, scale = 2)
    private BigDecimal revenue1;

}