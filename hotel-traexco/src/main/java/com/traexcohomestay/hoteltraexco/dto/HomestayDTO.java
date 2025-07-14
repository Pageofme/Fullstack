package com.traexcohomestay.hoteltraexco.dto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class HomestayDTO {
    private Integer id;
    private String homestayName;
    private String address;
    private String location;
    private String description;
    private Integer hostId;
    private Boolean status;
    private List<HomestayImageDTO> images;

}