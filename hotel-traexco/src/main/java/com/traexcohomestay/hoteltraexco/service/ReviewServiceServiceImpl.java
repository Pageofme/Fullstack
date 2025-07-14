package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ReviewDTO;
import com.traexcohomestay.hoteltraexco.model.Review;
import com.traexcohomestay.hoteltraexco.model.ReviewService;
import com.traexcohomestay.hoteltraexco.repository.ReviewServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewServiceServiceImpl implements ReviewServiceService {

    @Autowired
    private ReviewServiceRepository reviewServiceRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByService(Integer serviceId) {
        List<ReviewService> reviewServices = reviewServiceRepository.findByService_Id(serviceId);
        return reviewServices.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private ReviewDTO convertToDTO(ReviewService reviewService) {
        ReviewDTO dto = new ReviewDTO();
        Review review = reviewService.getReview();
        dto.setReviewId(review.getId());
        dto.setUserName(review.getUser().getFullName());
        dto.setRating(reviewService.getRating());
        dto.setComment(reviewService.getComment());
        dto.setCreatedAt(review.getCreatedAt().atZone(ZoneId.systemDefault()).toInstant());

        return dto;
    }
}