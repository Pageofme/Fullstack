package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "HomestayImages")
public class HomestayImage {
    @Id
    @Column(name = "homestayImage_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "homestay_id")
    private Homestay homestay;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "description", length = 100)
    private String description;

    @ColumnDefault("getdate()")
    @Column(name = "created_at")
    private Instant createdAt;

}