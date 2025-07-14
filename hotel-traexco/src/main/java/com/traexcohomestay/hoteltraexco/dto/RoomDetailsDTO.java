package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class RoomDetailsDTO {
    private RoomDTO room;
    private HomestayDTO homestay;
    private List<RoomImageDTO> images;
    private List<HomestayImageDTO> homestayImages;
    private List<AmenityDTO> amenities;
}