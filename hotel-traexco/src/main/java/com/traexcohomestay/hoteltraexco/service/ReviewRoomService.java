package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ReviewDTO;
import java.util.List;

public interface ReviewRoomService {
    List<ReviewDTO> getReviewsByRoom(Integer homestayId, String roomNumber);
}