package com.traexcohomestay.hoteltraexco.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
@Configuration
@Getter
public class MoMoConfig {

    private final String partnerCode;
    private final String accessKey;
    private final String secretKey;
    private final String redirectUrl;
    private final String ipnUrl;
    private final String apiUrl;

    public MoMoConfig(
            @Value("${momo.partnerCode}") String partnerCode,
            @Value("${momo.accessKey}") String accessKey,
            @Value("${momo.secretKey}") String secretKey,
            @Value("${momo.redirectUrl}") String redirectUrl,
            @Value("${momo.ipnUrl}") String ipnUrl,
            @Value("${momo.apiUrl}") String apiUrl
    ) {
        this.partnerCode = partnerCode;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
        this.redirectUrl = redirectUrl;
        this.ipnUrl = ipnUrl;
        this.apiUrl = apiUrl;
    }
}
