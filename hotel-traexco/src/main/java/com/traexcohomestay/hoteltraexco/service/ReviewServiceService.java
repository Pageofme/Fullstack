package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ReviewDTO;
import java.util.List;

public interface ReviewServiceService {
    List<ReviewDTO> getReviewsByService(Integer serviceId);
}