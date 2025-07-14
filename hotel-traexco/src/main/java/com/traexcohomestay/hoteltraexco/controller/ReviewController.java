package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.ReviewDTO;
import com.traexcohomestay.hoteltraexco.service.ReviewRoomService;
import com.traexcohomestay.hoteltraexco.service.ReviewServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRoomService reviewRoomService;

    @Autowired
    private ReviewServiceService reviewServiceService;

    @GetMapping("/room/{homestayId}/{roomNumber}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByRoom(
            @PathVariable Integer homestayId,
            @PathVariable String roomNumber) {
        List<ReviewDTO> reviews = reviewRoomService.getReviewsByRoom(homestayId, roomNumber);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByService(
            @PathVariable Integer serviceId) {
        List<ReviewDTO> reviews = reviewServiceService.getReviewsByService(serviceId);
        return ResponseEntity.ok(reviews);
    }
}