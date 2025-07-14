package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.Room;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RoomChartRepository extends CrudRepository<Room, Long> {
    @Query("SELECT r.type, COUNT(r) FROM Room r GROUP BY r.type")
    List<Object[]> getRoomTypeCount();
}