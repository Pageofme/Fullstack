package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
public class Voucher {
    @Id
    @Column(name = "voucher_id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "vourcher_name", length = 100)
    private String vourcherName;

    @Column(name = "discount", precision = 4, scale = 2)
    private BigDecimal discount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "homestay_id")
    private Homestay homestay;

    @Nationalized
    @Lob
    @Column(name = "condition")
    private String condition;

}