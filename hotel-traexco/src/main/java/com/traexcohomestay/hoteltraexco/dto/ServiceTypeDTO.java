package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceTypeDTO {
    private Integer id;
    private String serviceName;
    private String description;
    private String iconClass;
}