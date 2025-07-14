package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.Room;
import com.traexcohomestay.hoteltraexco.model.RoomId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, RoomId> {
    List<Room> findByHomestay_HomestayId(Integer homestayId);
}