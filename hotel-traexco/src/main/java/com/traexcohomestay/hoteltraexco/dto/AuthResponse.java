package com.traexcohomestay.hoteltraexco.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String role;
    public AuthResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }
}