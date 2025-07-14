package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CancellationPolicyDTO {
    private Integer id;
    private Integer homestayId;
    private String name;
    private String description;
    private BigDecimal refundPercentage;
    private Integer daysBeforeCheckin;
}