package com.traexcohomestay.hoteltraexco.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GoogleAuthRequest {
    @NotBlank(message = "Token không được để trống")
    private String token;
}