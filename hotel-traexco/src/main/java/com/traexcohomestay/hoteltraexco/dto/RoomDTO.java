package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class RoomDTO {
    private Integer homestayId;
    private String roomNumber;
    private String type;
    private BigDecimal price;
    private Integer capacity;
    private Double rating;
    private Boolean status;
    private List<RoomImageDTO> images;
}