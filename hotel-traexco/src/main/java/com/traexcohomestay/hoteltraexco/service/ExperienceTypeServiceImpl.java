package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ExperienceTypeDTO;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.model.ExperienceType;
import com.traexcohomestay.hoteltraexco.repository.ExperienceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ExperienceTypeServiceImpl implements ExperienceTypeService {

    @Autowired
    private ExperienceTypeRepository experienceTypeRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ExperienceTypeDTO> getAllExperienceTypes() {
        return experienceTypeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ExperienceTypeDTO> getAllExperienceTypesPaged(Pageable pageable) {
        return experienceTypeRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public ExperienceTypeDTO getExperienceTypeById(Integer id) {
        ExperienceType experienceType = experienceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ExperienceType not found with id: " + id));
        return convertToDTO(experienceType);
    }

    private ExperienceTypeDTO convertToDTO(ExperienceType experienceType) {
        ExperienceTypeDTO dto = new ExperienceTypeDTO();
        dto.setId(experienceType.getId());
        dto.setExperienceName(experienceType.getExperienceName());
        dto.setDescription(experienceType.getDescription());
        dto.setIconClass(experienceType.getIconClass());
        return dto;
    }
}