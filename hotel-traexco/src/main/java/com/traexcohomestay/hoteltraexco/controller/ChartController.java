package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.RevenueDTO;
import com.traexcohomestay.hoteltraexco.dto.RoomTypeDTO;
import com.traexcohomestay.hoteltraexco.repository.BookingChartRepository;
import com.traexcohomestay.hoteltraexco.repository.RoomChartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/chart")
@CrossOrigin(origins = "*") // Cho phép frontend gọi API
public class ChartController {

    @Autowired
    private BookingChartRepository bookingRepo;

    @Autowired
    private RoomChartRepository roomRepo;

    @GetMapping("/revenue")
    public List<RevenueDTO> getRevenue() {
        List<Object[]> data = bookingRepo.getMonthlyRevenue();
        List<RevenueDTO> result = new ArrayList<>();
        for (Object[] row : data) {
            Integer month = (Integer) row[0];
            Double total = ((Number) row[1]).doubleValue();
            result.add(new RevenueDTO("T" + month, total));
        }
        return result;
    }

    @GetMapping("/revenue/filter")
    public List<RevenueDTO> getFilteredRevenue(@RequestParam(required = false) Integer year,
                                               @RequestParam(required = false) Integer month) {
        List<Object[]> data = bookingRepo.getFilteredRevenue(year, month);
        List<RevenueDTO> result = new ArrayList<>();
        for (Object[] row : data) {
            Integer m = (Integer) row[0];
            Double total = ((Number) row[1]).doubleValue();
            result.add(new RevenueDTO("T" + m, total));
        }
        return result;
    }

    @GetMapping("/room-types")
    public List<RoomTypeDTO> getRoomTypeCount() {
        List<Object[]> data = roomRepo.getRoomTypeCount();
        List<RoomTypeDTO> result = new ArrayList<>();
        for (Object[] row : data) {
            String type = (String) row[0];
            Long count = (Long) row[1];
            result.add(new RoomTypeDTO(type, count));
        }
        return result;
    }
}