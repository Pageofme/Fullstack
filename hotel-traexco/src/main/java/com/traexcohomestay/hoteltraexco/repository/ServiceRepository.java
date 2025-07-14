package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {

    // Phương thức tìm service bằng ID - được sử dụng trong BookingServiceImpl
    Optional<Service> findById(Integer id);

    // Phương thức lấy tất cả service của một homestay (nếu cần)
    List<Service> findByHomestay_HomestayId(Integer homestayId);

    // Phương thức kiểm tra tồn tại service bằng ID
    boolean existsById(Integer id);

    // Có thể thêm các phương thức tìm kiếm khác nếu cần
    // List<Service> findByNameContaining(String name);
    // List<Service> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
}