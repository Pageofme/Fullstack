package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.HomestayRuleDTO;
import com.traexcohomestay.hoteltraexco.service.HomestayRuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/homestay-rules")
public class HomestayRuleController {

    @Autowired
    private HomestayRuleService homestayRuleService;

    @GetMapping("/homestay/{homestayId}")
    public ResponseEntity<List<HomestayRuleDTO>> getRulesByHomestayId(@PathVariable Integer homestayId) {
        return ResponseEntity.ok(homestayRuleService.getRulesByHomestayId(homestayId));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}