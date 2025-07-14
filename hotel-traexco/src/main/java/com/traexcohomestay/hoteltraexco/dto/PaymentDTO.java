package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PaymentDTO {
    private Integer bookingId;
    private BigDecimal amount;
    private String paymentMethod;
    private String status;
    private String paymentDetails;
    private Boolean isDeposit;
}