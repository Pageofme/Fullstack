package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.AmenityDTO;
import java.util.List;

public interface AmenityService {
    List<AmenityDTO> getAmenitiesByHomestayId(Integer homestayId);
}