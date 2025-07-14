package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReviewRequest {
    private Integer bookingId;
    private Integer userId;
    private Integer roomRating;
    private String roomComment;
    private List<ServiceReviewDTO> serviceReviews;

    @Getter
    @Setter
    public static class ServiceReviewDTO {
        private Integer serviceId;
        private Integer rating;
        private String comment;
    }
}