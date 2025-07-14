    package com.traexcohomestay.hoteltraexco.repository;

    import com.traexcohomestay.hoteltraexco.model.ReviewRoom;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.stereotype.Repository;

    import java.util.List;

    @Repository
    public interface ReviewRoomRepository extends JpaRepository<ReviewRoom, Integer> {
        List<ReviewRoom> findByRooms_Id_HomestayIdAndRooms_Id_RoomNumber(Integer homestayId, String roomNumber);
        List<ReviewRoom> findByRooms_Id_HomestayId(Integer homestayId);
    }