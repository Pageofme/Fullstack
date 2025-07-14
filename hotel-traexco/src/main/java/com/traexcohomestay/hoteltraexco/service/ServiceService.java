package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ServiceDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ServiceService {
    List<ServiceDTO> getAllServices();
    Page<ServiceDTO> getAllServicesPaged(Pageable pageable);
    ServiceDTO getServiceById(Integer id);
    ServiceDTO createService(ServiceDTO serviceDTO);
    ServiceDTO updateService(Integer id, ServiceDTO serviceDTO);
    void deleteService(Integer id);
    List<ServiceDTO> findByHomestayId(Integer homestayId);

}