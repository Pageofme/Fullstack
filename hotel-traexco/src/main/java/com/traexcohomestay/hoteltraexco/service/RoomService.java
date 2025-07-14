package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.RoomDTO;
import com.traexcohomestay.hoteltraexco.dto.RoomDetailsDTO;


import java.util.List;

public interface RoomService {
    // API hiện có từ câu hỏi trước
    RoomDetailsDTO getRoomDetails(Integer homestayId, String roomNumber);

    // API mới để lấy danh sách phòng của homestay
    List<RoomDTO> getRoomsByHomestayId(Integer homestayId);
}