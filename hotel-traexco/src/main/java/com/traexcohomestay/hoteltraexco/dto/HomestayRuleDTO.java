package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HomestayRuleDTO {
    private Integer ruleId;
    private String ruleName;
    private String description;
    private Boolean status;
}