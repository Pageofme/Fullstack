package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.BookingDTO;
import com.traexcohomestay.hoteltraexco.dto.ServiceDTO;
import com.traexcohomestay.hoteltraexco.dto.ServiceTypeDTO;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.model.Booking;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.BookingRepository;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import com.traexcohomestay.hoteltraexco.service.BookingService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private BookingService bookingService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('HOST') or hasRole('ADMIN')")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Integer id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        Hibernate.initialize(booking.getBookingServices());
        if (booking.getBookingServices() != null) {
            booking.getBookingServices().forEach(bs -> {
                Hibernate.initialize(bs.getService());
                if (bs.getService() != null) {
                    Hibernate.initialize(bs.getService().getServiceType());
                }
            });
        }

        return ResponseEntity.ok(convertToDTO(booking));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO bookingDTO, Authentication authentication) {
        try {
            // Lấy thông tin người dùng từ token JWT
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

            // Kiểm tra userId trong bookingDTO khớp với người dùng đã đăng nhập
            if (!user.getId().equals(bookingDTO.getUserId())) {
                return ResponseEntity.badRequest().body("Không được phép: userId không khớp với người dùng đã đăng nhập");
            }

            // Kiểm tra trạng thái người dùng
            if (!userRepository.existsByIdAndStatus(bookingDTO.getUserId(), true)) {
                return ResponseEntity.badRequest().body("Người dùng không hợp lệ hoặc bị vô hiệu hóa");
            }

            BookingDTO createdBooking = bookingService.createBooking(bookingDTO);
            return ResponseEntity.ok(createdBooking);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi khi tạo đặt phòng: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}/latest")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id or hasRole('ADMIN')")
    public ResponseEntity<BookingDTO> getLatestBookingByUser(@PathVariable Integer userId) {
        Booking booking = bookingRepository.findTopByUserIdOrderByCreatedAtDesc(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đặt phòng nào cho người dùng này."));
        BookingDTO bookingDTO = convertToDTO(booking);
        return ResponseEntity.ok(bookingDTO);
    }

    @GetMapping("/homestay/{homestayId}")
    @PreAuthorize("hasRole('HOST') or hasRole('ADMIN')")
    public ResponseEntity<List<BookingDTO>> getBookingsByHomestay(@PathVariable Integer homestayId) {
        List<BookingDTO> bookings = bookingService.getBookingsByHomestay(homestayId);
        return ResponseEntity.ok(bookings);
    }

    @PutMapping("/{bookingId}/status")
    @PreAuthorize("hasRole('HOST') or hasRole('ADMIN')")
    public ResponseEntity<?> updateBookingStatus(
            @PathVariable Integer bookingId,
            @RequestParam String status,
            @RequestParam(required = false) String reason) {
        try {
            BookingDTO updatedBooking = bookingService.updateBookingStatus(bookingId, status);
            return ResponseEntity.ok(updatedBooking);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{bookingId}/cancel")
    @PreAuthorize("hasRole('USER') and #bookingId == @bookingRepository.findById(#bookingId).get().user.id or hasRole('ADMIN')")
    public ResponseEntity<?> cancelBooking(@PathVariable Integer bookingId) {
        try {
            BookingDTO cancelledBooking = bookingService.cancelBooking(bookingId);
            return ResponseEntity.ok(cancelledBooking);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi khi hủy đặt phòng");
        }
    }

    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUser().getId());
        dto.setHomestayId(booking.getRooms().getId().getHomestayId());
        dto.setHomestayName(booking.getRooms().getHomestay().getHomestayName());
        dto.setRoomNumber(booking.getRooms().getId().getRoomNumber());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setAdults(booking.getAdults());
        dto.setChildren(booking.getChildren());
        dto.setTotalPeople(booking.getTotalPeople());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setStatus(booking.getStatus());

        if (booking.getBookingServices() != null && !booking.getBookingServices().isEmpty()) {
            List<ServiceDTO> serviceDTOs = booking.getBookingServices().stream()
                    .map(bs -> {
                        ServiceDTO serviceDTO = new ServiceDTO();
                        serviceDTO.setId(bs.getService().getId());
                        serviceDTO.setPrice(bs.getService().getPrice());
                        serviceDTO.setSpecialNotes(bs.getService().getSpecialNotes());
                        if (bs.getService().getServiceType() != null) {
                            ServiceTypeDTO typeDTO = new ServiceTypeDTO();
                            typeDTO.setServiceName(bs.getService().getServiceType().getServiceName());
                            serviceDTO.setServiceType(typeDTO);
                        }
                        return serviceDTO;
                    })
                    .collect(Collectors.toList());

            dto.setServiceDetails(serviceDTOs);
            List<String> serviceIds = serviceDTOs.stream()
                    .map(s -> String.valueOf(s.getId()))
                    .collect(Collectors.toList());
            dto.setServices(serviceIds);
        }

        return dto;
    }
}