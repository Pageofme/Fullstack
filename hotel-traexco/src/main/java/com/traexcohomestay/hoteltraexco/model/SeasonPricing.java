package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
public class SeasonPricing {
    @Id
    @Column(name = "season_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "homestay_id")
    private Homestay homestay;

    @Nationalized
    @Column(name = "season", length = 50)
    private String season;

    @Column(name = "increaseRate", precision = 4, scale = 2)
    private BigDecimal increaseRate;

    @Column(name = "typeRoom", length = 50)
    private String typeRoom;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

}