package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "HomestayRules")
public class HomestayRule {
    @Id
    @Column(name = "rule_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "homestay_id", nullable = false)
    private Homestay homestay;

    @Nationalized
    @Column(name = "rule_name", length = 100)
    private String ruleName;

    @Nationalized
    @Column(name = "description")
    private String description;

    @ColumnDefault("1")
    @Column(name = "status")
    private Boolean status;

    @ColumnDefault("getdate()")
    @Column(name = "created_at")
    private Instant createdAt;

}