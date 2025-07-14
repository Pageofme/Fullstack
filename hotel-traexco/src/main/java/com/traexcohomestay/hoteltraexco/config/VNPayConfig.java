package com.traexcohomestay.hoteltraexco.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class VNPayConfig {
    @Value("${vnpay.tmnCode}")
    public String vnp_TmnCode;

    @Value("${vnpay.hashSecret}")
    public  String vnp_HashSecret;

    @Value("${vnpay.url}")
    public  String vnp_Url;

    @Value("${vnpay.returnUrl}")
    public  String vnp_ReturnUrl;
}