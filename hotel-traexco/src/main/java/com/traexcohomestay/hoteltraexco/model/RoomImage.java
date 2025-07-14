package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "RoomImages")
public class RoomImage {
    @Id
    @Column(name = "roomImage_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "homestay_id", referencedColumnName = "homestay_id"),
            @JoinColumn(name = "room_number", referencedColumnName = "room_number")
    })
    private Room rooms;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "description", length = 100)
    private String description;

    @ColumnDefault("getdate()")
    @Column(name = "created_at")
    private Instant createdAt;

}