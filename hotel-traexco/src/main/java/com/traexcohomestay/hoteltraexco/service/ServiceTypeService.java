package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ServiceTypeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ServiceTypeService {
    List<ServiceTypeDTO> getAllServiceTypes();
    Page<ServiceTypeDTO> getAllServiceTypesPaged(Pageable pageable);
    ServiceTypeDTO getServiceTypeById(Integer id);
}