package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.AmenityDTO;
import com.traexcohomestay.hoteltraexco.service.AmenityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/amenities")
public class AmenityController {
    @Autowired
    private AmenityService amenityService;

    @GetMapping("/homestay/{homestayId}")
    public ResponseEntity<List<AmenityDTO>> getAmenitiesByHomestayId(@PathVariable Integer homestayId) {
        return ResponseEntity.ok(amenityService.getAmenitiesByHomestayId(homestayId));
    }
}