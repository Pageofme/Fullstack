package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "Rooms")
public class Room {
    @EmbeddedId
    private RoomId id;

    @MapsId("homestayId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "homestay_id", nullable = false)
    private Homestay homestay;

    @Column(name = "type", length = 50)
    private String type;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "rating")
    private Double rating;

    @ColumnDefault("1")
    @Column(name = "status")
    private Boolean status;

}