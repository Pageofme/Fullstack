package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ExperienceTypeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ExperienceTypeService {
    List<ExperienceTypeDTO> getAllExperienceTypes();
    Page<ExperienceTypeDTO> getAllExperienceTypesPaged(Pageable pageable);
    ExperienceTypeDTO getExperienceTypeById(Integer id);
}