package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.BookingDTO;
import com.traexcohomestay.hoteltraexco.dto.NotificationDTO;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.model.*;
import com.traexcohomestay.hoteltraexco.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {
    private static final Logger logger = LoggerFactory.getLogger(BookingServiceImpl.class);

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final BookingServiceService bookingServiceService;
    private final NotificationRepository notificationRepository;
    private final CancellationPolicyRepository cancellationPolicyRepository;
    private final HomestayRepository homestayRepository;
    private final ServiceRepository serviceRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationService notificationService;

    @Autowired
    public BookingServiceImpl(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            RoomRepository roomRepository,
            BookingServiceService bookingServiceService,
            NotificationRepository notificationRepository,
            CancellationPolicyRepository cancellationPolicyRepository,
            HomestayRepository homestayRepository,
            ServiceRepository serviceRepository,
            SimpMessagingTemplate messagingTemplate,
            NotificationService notificationService) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.bookingServiceService = bookingServiceService;
        this.notificationRepository = notificationRepository;
        this.cancellationPolicyRepository = cancellationPolicyRepository;
        this.homestayRepository = homestayRepository;
        this.serviceRepository = serviceRepository;
        this.messagingTemplate = messagingTemplate;
        this.notificationService = notificationService;
    }

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        logger.info("Received booking request: {}", bookingDTO);
        if (bookingDTO == null) {
            logger.error("BookingDTO is null");
            throw new IllegalArgumentException("BookingDTO is null");
        }
        if (bookingDTO.getUserId() == null || bookingDTO.getHomestayId() == null ||
                bookingDTO.getRoomNumber() == null || bookingDTO.getCheckInDate() == null ||
                bookingDTO.getCheckOutDate() == null || bookingDTO.getAdults() == null ||
                bookingDTO.getChildren() == null || bookingDTO.getTotalPeople() == null ||
                bookingDTO.getTotalAmount() == null) {
            logger.error("Missing required fields in bookingDTO: {}", bookingDTO);
            throw new IllegalArgumentException("All required fields must be provided");
        }

        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> {
                    logger.error("User not found with id: {}", bookingDTO.getUserId());
                    return new ResourceNotFoundException("User not found with id: " + bookingDTO.getUserId());
                });
        logger.info("Found user: {}", user);

        RoomId roomId = new RoomId(bookingDTO.getHomestayId(), bookingDTO.getRoomNumber());
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> {
                    logger.error("Room not found with homestayId: {} and roomNumber: {}", bookingDTO.getHomestayId(), bookingDTO.getRoomNumber());
                    return new ResourceNotFoundException("Room not found with homestayId: " + bookingDTO.getHomestayId() + " and roomNumber: " + bookingDTO.getRoomNumber());
                });
        logger.info("Found room: {}", room);
        // Kiểm tra phòng trống
        List<Booking> conflictingBookings = bookingRepository.findByRooms_Id_HomestayIdAndRooms_Id_RoomNumber(
                        bookingDTO.getHomestayId(), bookingDTO.getRoomNumber()).stream()
                .filter(b -> b.getStatus().equals("CONFIRMED") &&
                        (bookingDTO.getCheckInDate().isBefore(b.getCheckOutDate()) &&
                                bookingDTO.getCheckOutDate().isAfter(b.getCheckInDate())))
                .collect(Collectors.toList());
        if (!conflictingBookings.isEmpty()) {
            throw new IllegalStateException("Phòng không khả dụng trong khoảng thời gian yêu cầu");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRooms(room);
        booking.setCheckInDate(bookingDTO.getCheckInDate());
        booking.setCheckOutDate(bookingDTO.getCheckOutDate());
        booking.setAdults(bookingDTO.getAdults());
        booking.setChildren(bookingDTO.getChildren());
        booking.setTotalPeople(bookingDTO.getTotalPeople());
        booking.setTotalAmount(bookingDTO.getTotalAmount());
        booking.setStatus("PENDING");
        BigDecimal serviceTotal = BigDecimal.ZERO;
        List<String> serviceIds = bookingDTO.getServices() != null ? bookingDTO.getServices() : new ArrayList<>();
        if (!serviceIds.isEmpty()) {
            List<com.traexcohomestay.hoteltraexco.model.Service> services = serviceIds.stream()
                    .map(id -> serviceRepository.findById(Integer.valueOf(id))
                            .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id)))
                    .collect(Collectors.toList());
            serviceTotal = services.stream()
                    .map(com.traexcohomestay.hoteltraexco.model.Service::getPrice)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
        }
        booking.setTotalAmount(bookingDTO.getTotalAmount().add(serviceTotal));
        try {
            Booking savedBooking = bookingRepository.save(booking);
            logger.info("Saved booking ID: {}", savedBooking.getId());

            // Tạo thông báo cho chủ homestay
            Homestay homestay = homestayRepository.findById(bookingDTO.getHomestayId())
                    .orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + bookingDTO.getHomestayId()));

            // Tìm host dựa trên hostId trong Homestay và role HOST
            User host = userRepository.findHostById(homestay.getHostId())
                    .orElseThrow(() -> new ResourceNotFoundException("Host not found for homestay: " + homestay.getHomestayId()));
            Notification notification = new Notification();
            notification.setUser(host);
            notification.setMessage("Đặt phòng mới: Booking #" + savedBooking.getId() + " cho phòng " + bookingDTO.getRoomNumber());
            notification.setType("BOOKING_CREATED");
            notification.setStatus(false);
            notification.setCreatedAt(Instant.now());
            notificationRepository.save(notification);
            logger.info("Created notification for host: {}", host.getId());

            // Gửi thông báo thời gian thực và Email/SMS cho host
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setId(notification.getId());
            notificationDTO.setUserId(host.getId());
            notificationDTO.setMessage(notification.getMessage());
            notificationDTO.setType(notification.getType());
            notificationDTO.setStatus(notification.getStatus());
            notificationDTO.setCreatedAt(notification.getCreatedAt());
            messagingTemplate.convertAndSend("/topic/notifications/" + host.getId(), notificationDTO);
            notificationService.sendEmail(host, notification);


            BookingDTO result = new BookingDTO();
            result.setId(savedBooking.getId());
            result.setUserId(savedBooking.getUser().getId());
            result.setHomestayId(savedBooking.getRooms().getId().getHomestayId());
            result.setRoomNumber(savedBooking.getRooms().getId().getRoomNumber());
            result.setCheckInDate(savedBooking.getCheckInDate());
            result.setCheckOutDate(savedBooking.getCheckOutDate());
            result.setAdults(savedBooking.getAdults());
            result.setChildren(savedBooking.getChildren());
            result.setTotalPeople(savedBooking.getTotalPeople());
            result.setTotalAmount(savedBooking.getTotalAmount());
            result.setStatus(savedBooking.getStatus());

            bookingServiceService.processServices(savedBooking, serviceIds, result);

            logger.info("Returning BookingDTO: {}", result);
            return result;
        } catch (Exception e) {
            logger.error("Error saving booking: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingDTO> getBookingsByHomestay(Integer homestayId) {
        logger.info("Fetching bookings for homestayId: {}", homestayId);
        List<Booking> bookings = bookingRepository.findByRooms_Id_HomestayId(homestayId);
        return bookings.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public BookingDTO updateBookingStatus(Integer bookingId, String status) {
        logger.info("Updating booking ID: {} to status: {}", bookingId, status);
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        if (!List.of("PENDING", "CONFIRMED", "CANCELLED").contains(status)) {
            throw new IllegalArgumentException("Invalid status: " + status);
        }

        booking.setStatus(status);
        Booking updatedBooking = bookingRepository.save(booking);

        // Tạo thông báo cho khách
        User customer = updatedBooking.getUser();
        Notification notification = new Notification();
        notification.setUser(customer);
        if (status.equals("CONFIRMED")) {
            notification.setMessage("Đặt phòng #" + bookingId + " của bạn đã được chấp nhận");
            notification.setType("BOOKING_CONFIRMED");
        } else if (status.equals("CANCELLED")) {
            notification.setMessage("Đặt phòng #" + bookingId + " của bạn đã bị từ chối");
            notification.setType("BOOKING_REJECTED");
        }
        notification.setStatus(false);
        notification.setCreatedAt(Instant.now());
        notificationRepository.save(notification);
        logger.info("Created notification for customer: {}", customer.getId());

        // Gửi thông báo thời gian thực và Email/SMS cho khách
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setId(notification.getId());
        notificationDTO.setUserId(customer.getId());
        notificationDTO.setMessage(notification.getMessage());
        notificationDTO.setType(notification.getType());
        notificationDTO.setStatus(notification.getStatus());
        notificationDTO.setCreatedAt(notification.getCreatedAt());
        messagingTemplate.convertAndSend("/topic/notifications/" + customer.getId(), notificationDTO);
        notificationService.sendEmail(customer, notification);


        return convertToDTO(updatedBooking);
    }

    @Override
    public BookingDTO cancelBooking(Integer bookingId) {
        logger.info("Cancelling booking ID: {}", bookingId);
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        if (booking.getStatus().equals("CANCELLED")) {
            throw new IllegalStateException("Booking is already cancelled");
        }

        long daysUntilCheckIn = ChronoUnit.DAYS.between(Instant.now(), booking.getCheckInDate().atStartOfDay());
        Integer homestayId = booking.getRooms().getId().getHomestayId();

        List<CancellationPolicy> policies = cancellationPolicyRepository.findByHomestayId(homestayId);
        BigDecimal refundPercentage = BigDecimal.ZERO;
        for (CancellationPolicy policy : policies) {
            if (daysUntilCheckIn >= policy.getDaysBeforeCheckin()) {
                refundPercentage = policy.getRefundPercentage();
                break;
            }
        }

        booking.setStatus("CANCELLED");
        Booking updatedBooking = bookingRepository.save(booking);

        Homestay homestay = homestayRepository.findById(homestayId)
                .orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + homestayId));

        // Tìm host dựa trên hostId trong Homestay và role HOST
        User host = userRepository.findHostById(homestay.getHostId())
                .orElseThrow(() -> new ResourceNotFoundException("Host not found for homestay: " + homestay.getHomestayId()));
        Notification hostNotification = new Notification();
        hostNotification.setUser(host);
        hostNotification.setMessage("Đặt phòng #" + bookingId + " đã bị hủy, hoàn tiền " + refundPercentage + "%");
        hostNotification.setType("BOOKING_CANCELLED");
        hostNotification.setStatus(false);
        hostNotification.setCreatedAt(Instant.now());
        notificationRepository.save(hostNotification);
        logger.info("Created cancellation notification for host: {}", host.getId());

        // Gửi thông báo thời gian thực và Email/SMS cho host
        NotificationDTO hostNotificationDTO = new NotificationDTO();
        hostNotificationDTO.setId(hostNotification.getId());
        hostNotificationDTO.setUserId(host.getId());
        hostNotificationDTO.setMessage(hostNotification.getMessage());
        hostNotificationDTO.setType(hostNotification.getType());
        hostNotificationDTO.setStatus(hostNotification.getStatus());
        hostNotificationDTO.setCreatedAt(hostNotification.getCreatedAt());
        messagingTemplate.convertAndSend("/topic/notifications/" + host.getId(), hostNotificationDTO);
        notificationService.sendEmail(host, hostNotification);


        User customer = updatedBooking.getUser();
        Notification customerNotification = new Notification();
        customerNotification.setUser(customer);
        customerNotification.setMessage("Bạn đã hủy đặt phòng #" + bookingId + ", hoàn tiền " + refundPercentage + "%");
        customerNotification.setType("BOOKING_CANCELLED_BY_USER");
        customerNotification.setStatus(false);
        customerNotification.setCreatedAt(Instant.now());
        notificationRepository.save(customerNotification);
        logger.info("Created cancellation notification for customer: {}", customer.getId());

        // Gửi thông báo thời gian thực và Email/SMS cho khách
        NotificationDTO customerNotificationDTO = new NotificationDTO();
        customerNotificationDTO.setId(customerNotification.getId());
        customerNotificationDTO.setUserId(customer.getId());
        customerNotificationDTO.setMessage(customerNotification.getMessage());
        customerNotificationDTO.setType(customerNotification.getType());
        customerNotificationDTO.setStatus(customerNotification.getStatus());
        customerNotificationDTO.setCreatedAt(customerNotification.getCreatedAt());
        messagingTemplate.convertAndSend("/topic/notifications/" + customer.getId(), customerNotificationDTO);
        notificationService.sendEmail(customer, customerNotification);


        return convertToDTO(updatedBooking);
    }

    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUser().getId());
        dto.setHomestayId(booking.getRooms().getId().getHomestayId());
        dto.setRoomNumber(booking.getRooms().getId().getRoomNumber());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setAdults(booking.getAdults());
        dto.setChildren(booking.getChildren());
        dto.setTotalPeople(booking.getTotalPeople());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setStatus(booking.getStatus());

        if (booking.getBookingServices() != null && !booking.getBookingServices().isEmpty()) {
            List<String> serviceIds = booking.getBookingServices().stream()
                    .map(bs -> String.valueOf(bs.getService().getId()))
                    .collect(Collectors.toList());
            dto.setServices(serviceIds);
        }

        return dto;
    }
}