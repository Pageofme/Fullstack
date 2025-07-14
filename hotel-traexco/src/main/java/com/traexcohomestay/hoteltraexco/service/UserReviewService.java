package com.traexcohomestay.hoteltraexco.service;
import com.traexcohomestay.hoteltraexco.dto.ReviewRequest;
import com.traexcohomestay.hoteltraexco.model.Booking;
import com.traexcohomestay.hoteltraexco.model.Review;
import com.traexcohomestay.hoteltraexco.model.ReviewRoom;
import com.traexcohomestay.hoteltraexco.model.ReviewService;
import com.traexcohomestay.hoteltraexco.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserReviewService {

    @Autowired
    private ReviewRepository reviewRepo;

    @Autowired
    private ReviewRoomRepository reviewRoomRepo;

    @Autowired
    private ReviewServiceRepository reviewServiceRepo;

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    private ServiceRepository serviceRepository;

    public void submitReview(ReviewRequest request) {
        // Validate booking status
        Booking booking = bookingRepo.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy booking"));

        if (!booking.getUser().getId().equals(request.getUserId())) {
            throw new RuntimeException("Không hợp lệ: Booking không thuộc user này.");
        }

        // 1. Review tổng thể
        Review review = new Review();
        review.setUser(booking.getUser());

        review.setCreatedAt(LocalDateTime.now());
        review = reviewRepo.save(review);

        // 2. Review phòng
        ReviewRoom rr = new ReviewRoom();
        rr.setReview(review);
        rr.setRooms(booking.getRooms());
        rr.setRating(request.getRoomRating());
        rr.setComment(request.getRoomComment());
        reviewRoomRepo.save(rr);

        // 3. Review dịch vụ
        for (ReviewRequest.ServiceReviewDTO s : request.getServiceReviews()) {
            ReviewService rs = new ReviewService();
            rs.setReview(review);
            rs.setService(serviceRepository.findById(s.getServiceId())
                    .orElseThrow(() -> new RuntimeException("Service không tồn tại")));
            rs.setRating(s.getRating());
            rs.setComment(s.getComment());
            reviewServiceRepo.save(rs);
        }
    }
}