package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.model.ReviewRoom;
import com.traexcohomestay.hoteltraexco.model.ReviewService;
import com.traexcohomestay.hoteltraexco.repository.ReviewRoomRepository;
import com.traexcohomestay.hoteltraexco.repository.ReviewServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReviewServiceManagement {

    @Autowired
    private ReviewRoomRepository reviewRoomRepo;

    @Autowired
    private ReviewServiceRepository reviewServiceRepo;

    public Double getOverallRating(Integer homestayId, String timeRange, Integer hostId) {
        LocalDateTime startDate = getStartDate(timeRange);

        List<ReviewRoom> roomReviews = reviewRoomRepo.findByRooms_Id_HomestayIdAndRooms_Id_RoomNumber(homestayId, null)
                .stream()
                .filter(r -> r.getReview() != null
                        && r.getReview().getCreatedAt() != null
                        && r.getReview().getCreatedAt().isAfter(startDate))
                .collect(Collectors.toList());

        List<ReviewService> serviceReviews = reviewServiceRepo.findAll()
                .stream()
                .filter(r -> r.getReview() != null
                        && r.getReview().getCreatedAt() != null
                        && r.getReview().getCreatedAt().isAfter(startDate))
                .collect(Collectors.toList());

        int totalRatings = roomReviews.size() + serviceReviews.size();
        if (totalRatings == 0) return 0.0;

        double average = (roomReviews.stream().mapToInt(ReviewRoom::getRating).sum() +
                serviceReviews.stream().mapToInt(ReviewService::getRating).sum()) / (double) totalRatings;

        return Math.round(average * 10) / 10.0;
    }

    public Map<String, Double> getCategoryRatings(Integer homestayId, String timeRange, Integer hostId) {
        LocalDateTime startDate = getStartDate(timeRange);
        Map<String, Double> ratings = new HashMap<>();

        List<ReviewRoom> roomReviews = reviewRoomRepo.findByRooms_Id_HomestayIdAndRooms_Id_RoomNumber(homestayId, null)
                .stream()
                .filter(r -> r.getReview() != null
                        && r.getReview().getCreatedAt() != null
                        && r.getReview().getCreatedAt().isAfter(startDate))
                .collect(Collectors.toList());

        double roomComfort = roomReviews.isEmpty()
                ? 0.0
                : roomReviews.stream().mapToInt(ReviewRoom::getRating).average().orElse(0.0);
        ratings.put("Room Comfort", Math.round(roomComfort * 10) / 10.0);

        List<ReviewService> serviceReviews = reviewServiceRepo.findAll()
                .stream()
                .filter(r -> r.getReview() != null
                        && r.getReview().getCreatedAt() != null
                        && r.getReview().getCreatedAt().isAfter(startDate))
                .collect(Collectors.toList());

        double serviceRating = serviceReviews.isEmpty()
                ? 0.0
                : serviceReviews.stream().mapToInt(ReviewService::getRating).average().orElse(0.0);
        ratings.put("Service", Math.round(serviceRating * 10) / 10.0);

        // Chi tiết từng phòng
        Map<String, List<ReviewRoom>> roomsByNumber = roomReviews.stream()
                .collect(Collectors.groupingBy(r -> "Room " + r.getRooms().getId().getRoomNumber()));

        for (Map.Entry<String, List<ReviewRoom>> entry : roomsByNumber.entrySet()) {
            double roomRating = entry.getValue().isEmpty()
                    ? 0.0
                    : entry.getValue().stream().mapToInt(ReviewRoom::getRating).average().orElse(0.0);
            ratings.put(entry.getKey(), Math.round(roomRating * 10) / 10.0);
        }

        return ratings;
    }

    private LocalDateTime getStartDate(String timeRange) {
        LocalDateTime now = LocalDateTime.now();
        switch (timeRange) {
            case "week":
                return now.minusWeeks(1);
            case "month":
                return now.minusMonths(1);
            case "year":
                return now.minusYears(1);
            default:
                return now.minusWeeks(1);
        }
    }
}