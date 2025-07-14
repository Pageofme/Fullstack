package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Query("SELECT p FROM Payment p WHERE p.booking.rooms.homestay.hostId = :hostId AND p.status = :status")
    List<Payment> findByBookingRoomsHomestayHostIdAndStatus(Integer hostId, String status);

    Optional<Payment> findByPaymentDetailsContaining(String txnRef);
}