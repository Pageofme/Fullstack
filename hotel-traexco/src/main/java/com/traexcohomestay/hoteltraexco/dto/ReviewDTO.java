package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ReviewDTO {
    private Integer reviewId;
    private String userName;
    private Integer rating;
    private String comment;
    private Instant createdAt;
}