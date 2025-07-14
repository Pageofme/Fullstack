package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.BookingDTO;
import com.traexcohomestay.hoteltraexco.dto.ServiceDTO;
import com.traexcohomestay.hoteltraexco.dto.ServiceTypeDTO;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.model.Booking;
import com.traexcohomestay.hoteltraexco.model.BookingService;
import com.traexcohomestay.hoteltraexco.model.BookingServiceId;
import com.traexcohomestay.hoteltraexco.repository.BookingServiceRepository;
import com.traexcohomestay.hoteltraexco.repository.ServiceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingServiceServiceImpl implements BookingServiceService {

    private static final Logger logger = LoggerFactory.getLogger(BookingServiceServiceImpl.class);

    private final ServiceRepository serviceRepository;
    private final BookingServiceRepository bookingServiceRepository;

    @Autowired
    public BookingServiceServiceImpl(
            ServiceRepository serviceRepository,
            BookingServiceRepository bookingServiceRepository) {
        this.serviceRepository = serviceRepository;
        this.bookingServiceRepository = bookingServiceRepository;
    }

    @Override
    public void processServices(Booking booking, List<String> serviceIds, BookingDTO result) {
        logger.info("Processing services for booking ID: {}", booking.getId());

        if (serviceIds == null || serviceIds.isEmpty()) {
            result.setServices(List.of());
            result.setServiceDetails(List.of());
            return;
        }

        List<com.traexcohomestay.hoteltraexco.model.Service> services = getValidServices(serviceIds);
        List<BookingService> bookingServices = buildBookingServices(booking, services);
        List<ServiceDTO> serviceDTOs = buildServiceDTOs(services);

        bookingServiceRepository.saveAll(bookingServices);
        logger.info("Saved {} booking services for booking ID: {}", bookingServices.size(), booking.getId());

        result.setServices(serviceDTOs.stream().map(dto -> String.valueOf(dto.getId())).toList());
        result.setServiceDetails(serviceDTOs);
    }

    private List<com.traexcohomestay.hoteltraexco.model.Service> getValidServices(List<String> serviceIds) {
        return serviceIds.stream()
                .map(serviceId -> serviceRepository.findById(Integer.valueOf(serviceId))
                        .orElseThrow(() -> {
                            logger.error("Service not found with id: {}", serviceId);
                            return new ResourceNotFoundException("Không tìm thấy dịch vụ với id: " + serviceId);
                        }))
                .toList();
    }

    private List<BookingService> buildBookingServices(Booking booking, List<com.traexcohomestay.hoteltraexco.model.Service> services) {
        return services.stream()
                .map(service -> {
                    BookingService bookingService = new BookingService();
                    bookingService.setId(new BookingServiceId(booking.getId(), service.getId()));
                    bookingService.setBooking(booking);
                    bookingService.setService(service);
                    bookingService.setQuantity(1);
                    return bookingService;
                })
                .toList();
    }

    private List<ServiceDTO> buildServiceDTOs(List<com.traexcohomestay.hoteltraexco.model.Service> services) {
        return services.stream().map(service -> {
            ServiceDTO serviceDTO = new ServiceDTO();
            serviceDTO.setId(service.getId());
            serviceDTO.setPrice(service.getPrice());
            serviceDTO.setSpecialNotes(service.getSpecialNotes());

            if (service.getServiceType() != null) {
                ServiceTypeDTO typeDTO = new ServiceTypeDTO();
                typeDTO.setServiceName(service.getServiceType().getServiceName());
                serviceDTO.setServiceType(typeDTO);
            }
            return serviceDTO;
        }).toList();
    }
}