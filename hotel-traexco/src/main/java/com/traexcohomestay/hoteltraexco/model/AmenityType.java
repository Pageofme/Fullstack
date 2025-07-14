package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "AmenityType")
public class AmenityType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id")
    private Integer id;

    @Column(name = "typeName", length = 100)
    private String typeName;

    @OneToOne(mappedBy = "amenityType", cascade = CascadeType.ALL)
    private AmenityIcon amenityIcon;
}
