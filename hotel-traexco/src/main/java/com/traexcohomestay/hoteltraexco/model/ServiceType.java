package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
@Table(name = "ServiceType")
public class ServiceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "service_name", length = 100)
    private String serviceName;

    @Nationalized
    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "icon_class", length = 100)
    private String iconClass;
}