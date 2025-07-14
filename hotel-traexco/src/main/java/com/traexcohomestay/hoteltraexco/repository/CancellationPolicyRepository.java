package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.CancellationPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CancellationPolicyRepository extends JpaRepository<CancellationPolicy, Integer> {
    // Sử dụng đúng tên property homestay.homestayId
    List<CancellationPolicy> findByHomestay_HomestayId(Integer homestayId);

    // Hoặc dùng @Query tường minh
    @Query("SELECT cp FROM CancellationPolicy cp WHERE cp.homestay.homestayId = :homestayId")
    List<CancellationPolicy> findByHomestayId(@Param("homestayId") Integer homestayId);
}