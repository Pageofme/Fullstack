package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ExperienceDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ExperienceService {
    List<ExperienceDTO> getAllExperiences();
    Page<ExperienceDTO> getAllExperiencesPaged(Pageable pageable);
    ExperienceDTO getExperienceById(Integer id);
    ExperienceDTO createExperience(ExperienceDTO experienceDTO);
    ExperienceDTO updateExperience(Integer id, ExperienceDTO experienceDTO);
    void deleteExperience(Integer id);
    List<ExperienceDTO> findByHomestayId(Integer homestayId);
}