package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
public class ExperienceType {
    @Id
    @Column(name = "type_id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "experience_name", length = 100)
    private String experienceName;

    @Nationalized
    @Column(name = "description", length = 500)
    private String description;

    @Nationalized
    @Column(name = "icon_class", length = 100)
    private String iconClass;

}