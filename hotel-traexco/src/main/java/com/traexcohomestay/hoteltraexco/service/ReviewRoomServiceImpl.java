package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ReviewDTO;
import com.traexcohomestay.hoteltraexco.model.Review;
import com.traexcohomestay.hoteltraexco.model.ReviewRoom;
import com.traexcohomestay.hoteltraexco.repository.ReviewRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewRoomServiceImpl implements ReviewRoomService {

    @Autowired
    private ReviewRoomRepository reviewRoomRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByRoom(Integer homestayId, String roomNumber) {
        List<ReviewRoom> reviewRooms = reviewRoomRepository.findByRooms_Id_HomestayIdAndRooms_Id_RoomNumber(homestayId, roomNumber);
        return reviewRooms.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private ReviewDTO convertToDTO(ReviewRoom reviewRoom) {
        ReviewDTO dto = new ReviewDTO();
        Review review = reviewRoom.getReview();
        dto.setReviewId(review.getId());
        dto.setUserName(review.getUser().getFullName());
        dto.setRating(reviewRoom.getRating());
        dto.setComment(reviewRoom.getComment());
        dto.setCreatedAt(review.getCreatedAt().atZone(ZoneId.systemDefault()).toInstant());

        return dto;
    }
}