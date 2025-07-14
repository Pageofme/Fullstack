package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.RoomImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomImageRepository extends JpaRepository<RoomImage, Integer> {
    List<RoomImage> findByRooms_Id_HomestayIdAndRooms_Id_RoomNumber(Integer homestayId, String roomNumber);
    @Query("SELECT ri FROM RoomImage ri WHERE ri.rooms.id.homestayId = :homestayId")
    List<RoomImage> findAllByHomestayId(@Param("homestayId") Integer homestayId);
}