package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.Booking;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    @EntityGraph(attributePaths = {"user", "rooms", "rooms.homestay", "bookingServices", "bookingServices.service", "bookingServices.service.serviceType"})
    Optional<Booking> findById(Integer id);

    @EntityGraph(attributePaths = {"user", "rooms", "rooms.homestay", "bookingServices", "bookingServices.service", "bookingServices.service.serviceType"})
    Optional<Booking> findTopByUserIdOrderByCreatedAtDesc(Integer userId);

    // Phương thức tìm booking theo homestayId với EntityGraph để tải tất cả quan hệ cần thiết
    @EntityGraph(attributePaths = {"user", "rooms", "rooms.homestay", "bookingServices", "bookingServices.service"})
    List<Booking> findByRooms_Id_HomestayId(Integer homestayId);

    //  phương thức tìm booking theo hostId
    @Query("SELECT b FROM Booking b JOIN b.rooms r JOIN r.homestay h WHERE h.hostId = :hostId")
    @EntityGraph(attributePaths = {"user", "rooms", "bookingServices"})
    List<Booking> findByHostId(@Param("hostId") Integer hostId);

    // Phương thức tìm booking theo trạng thái và homestayId
    @EntityGraph(attributePaths = {"user", "rooms"})
    List<Booking> findByStatusAndRooms_Id_HomestayId(String status, Integer homestayId);

    @Query("SELECT b.user.id FROM Booking b WHERE b.id = :bookingId")
    Integer findUserIdByBookingId(@Param("bookingId") Integer bookingId);
    boolean existsByUserIdAndStatus(Integer userId, String status);

    List<Booking> findByRooms_Id_HomestayIdAndRooms_Id_RoomNumber(Integer homestayId, String roomNumber);
}