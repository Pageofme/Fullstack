package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RevenueDTO {
    private String name;
    private Double doanhThu;

    public RevenueDTO(String name, Double doanhThu) {
        this.name = name;
        this.doanhThu = doanhThu;
    }
}