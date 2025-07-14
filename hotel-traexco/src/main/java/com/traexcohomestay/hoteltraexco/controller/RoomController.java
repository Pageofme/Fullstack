package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.RoomDTO;
import com.traexcohomestay.hoteltraexco.dto.RoomDetailsDTO;
import com.traexcohomestay.hoteltraexco.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @GetMapping("/{homestayId}/{roomNumber}")
    public ResponseEntity<RoomDetailsDTO> getRoomDetails(
            @PathVariable Integer homestayId,
            @PathVariable String roomNumber) {
        return ResponseEntity.ok(roomService.getRoomDetails(homestayId, roomNumber));
    }

    @GetMapping("/homestay/{homestayId}")
    public ResponseEntity<List<RoomDTO>> getRoomsByHomestayId(@PathVariable Integer homestayId) {
        return ResponseEntity.ok(roomService.getRoomsByHomestayId(homestayId));
    }

}