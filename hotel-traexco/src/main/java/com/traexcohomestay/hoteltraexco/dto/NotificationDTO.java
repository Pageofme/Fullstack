package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class NotificationDTO {
    private Integer id;
    private Integer userId;
    private String message;
    private String type;
    private Boolean status;
    private Instant createdAt;
}