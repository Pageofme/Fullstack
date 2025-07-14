package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.BookingDTO;

import java.util.List;

public interface BookingService {
    BookingDTO createBooking(BookingDTO bookingDTO);
    List<BookingDTO> getBookingsByHomestay(Integer homestayId);
    BookingDTO updateBookingStatus(Integer bookingId, String status);
    BookingDTO cancelBooking(Integer bookingId);
}