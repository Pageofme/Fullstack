package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.PaymentDTO;
import com.traexcohomestay.hoteltraexco.service.PaymentService;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public ResponseEntity<?> createPayment(@RequestBody PaymentDTO paymentDTO) {
        try {
            if (paymentDTO.getBookingId() == null) {
                logger.error("BookingId is required");
                throw new IllegalArgumentException("BookingId is required");
            }
            PaymentDTO result = paymentService.createPayment(paymentDTO);
            logger.info("Created payment: {}", result);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            logger.error("Invalid input for createPayment: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Error creating payment: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi: " + e.getMessage());
        }
    }

    @PostMapping("/create-payment-url")
    public ResponseEntity<String> createPaymentUrl(@RequestBody PaymentDTO paymentDTO) {
        logger.info("Received createPaymentUrl request with PaymentDTO: {}", paymentDTO);
        try {
            String paymentUrl = paymentService.createPaymentUrl(paymentDTO);
            logger.info("Generated payment URL: {}", paymentUrl);
            return ResponseEntity.ok(paymentUrl);
        } catch (IllegalArgumentException e) {
            logger.error("Invalid input for createPaymentUrl: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Error creating payment URL: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi tạo URL thanh toán: " + e.getMessage());
        }
    }

    @GetMapping("/callback")
    public void handlePaymentCallback(
            @RequestParam(value = "vnp_ResponseCode", required = false) String vnpResponseCode,
            @RequestParam(value = "vnp_TxnRef", required = false) String vnpTxnRef,
            @RequestParam(value = "vnp_Amount", required = false) String vnpAmount,
            @RequestParam(value = "resultCode", required = false) String momoResultCode,
            @RequestParam(value = "orderId", required = false) String momoOrderId,
            @RequestParam(value = "amount", required = false) String momoAmount,
            @RequestParam(value = "vnp_SecureHash", required = false) String vnpSecureHash,
            @RequestParam Map<String, String> params,
            HttpServletResponse response) throws IOException {
        logger.info("Received payment callback with params: {}", params);
        paymentService.handlePaymentCallback(
                vnpResponseCode, vnpTxnRef, vnpAmount,
                momoResultCode, momoOrderId, momoAmount,
                vnpSecureHash, params, response
        );
    }
}