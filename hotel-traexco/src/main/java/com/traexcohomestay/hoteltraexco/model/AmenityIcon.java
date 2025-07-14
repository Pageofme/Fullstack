package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
@Table(name = "AmenityIcon")
public class AmenityIcon {

    @Id
    @Column(name = "type_id")
    private Integer id;

    @OneToOne
    @MapsId // Đánh dấu đây là mối quan hệ chia sẻ khóa chính
    @JoinColumn(name = "type_id") // Không dùng @PrimaryKeyJoinColumn ở đây, dùng JoinColumn là đủ
    private AmenityType amenityType;

    @Column(name = "icon_class", length = 100)
    private String iconClass;
}