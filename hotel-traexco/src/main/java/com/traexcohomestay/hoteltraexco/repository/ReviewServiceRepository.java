package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.ReviewService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewServiceRepository extends JpaRepository<ReviewService, Integer> {
    List<ReviewService> findByService_Id(Integer serviceId);
    List<ReviewService> findByService_Homestay_HomestayId(Integer homestayId);

}