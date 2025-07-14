package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Nationalized;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Homestays")
public class Homestay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "homestay_id")
    private Integer homestayId;

    @Column(name = "host_id")
    private Integer hostId;

    @Nationalized
    @Column(name = "homestayName", length = 100)
    private String homestayName;

    @Nationalized
    @Column(name = "address")
    private String address;

    @Lob
    @Column(name = "description")
    private String description;

    @ColumnDefault("1")
    @Column(name = "status")
    private Boolean status;

    @Nationalized
    @Column(name = "location", length = 100)
    private String location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "host_id", insertable = false, updatable = false)
    private User host;
    @OneToMany(mappedBy = "homestay", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CancellationPolicy> cancellationPolicies;
    // Bổ sung quan hệ với HomestayImage
    @OneToMany(mappedBy = "homestay", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<HomestayImage> images;
}