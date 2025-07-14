package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.BookingDTO;
import com.traexcohomestay.hoteltraexco.model.Booking;

import java.util.List;

public interface BookingServiceService {
    void processServices(Booking booking, List<String> serviceIds, BookingDTO result);
}