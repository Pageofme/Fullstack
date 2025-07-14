package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private Integer userId;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String role;
}