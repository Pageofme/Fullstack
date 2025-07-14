package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ExperienceDTO;
import com.traexcohomestay.hoteltraexco.dto.ExperienceImageDTO;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.model.Experience;
import com.traexcohomestay.hoteltraexco.model.ExperienceImage;
import com.traexcohomestay.hoteltraexco.model.Homestay;
import com.traexcohomestay.hoteltraexco.model.ExperienceType;
import com.traexcohomestay.hoteltraexco.repository.ExperienceRepository;
import com.traexcohomestay.hoteltraexco.repository.HomestayRepository;
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
public class ExperienceServiceImpl implements ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private HomestayRepository homestayRepository;

    @Autowired
    private ExperienceTypeRepository experienceTypeRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ExperienceDTO> getAllExperiences() {
        return experienceRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ExperienceDTO> getAllExperiencesPaged(Pageable pageable) {
        return experienceRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public ExperienceDTO getExperienceById(Integer id) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));
        return convertToDTO(experience);
    }

    @Override
    public ExperienceDTO createExperience(ExperienceDTO experienceDTO) {
        Experience experience = convertToEntity(experienceDTO);
        Experience savedExperience = experienceRepository.save(experience);
        return convertToDTO(savedExperience);
    }

    @Override
    public ExperienceDTO updateExperience(Integer id, ExperienceDTO experienceDTO) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));

        experience.setPrice(experienceDTO.getPrice());
        experience.setSpecialNotes(experienceDTO.getSpecialNotes());
        experience.setStatus(experienceDTO.getStatus());

        Homestay homestay = homestayRepository.findById(experienceDTO.getHomestayId())
                .orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + experienceDTO.getHomestayId()));
        experience.setHomestay(homestay);

        ExperienceType experienceType = experienceTypeRepository.findById(experienceDTO.getTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("ExperienceType not found with id: " + experienceDTO.getTypeId()));
        experience.setExperienceType(experienceType);

        // Update images
        if (experienceDTO.getImages() != null) {
            experience.getExperienceImages().clear();
            List<ExperienceImage> images = experienceDTO.getImages().stream().map(imgDTO -> {
                ExperienceImage image = new ExperienceImage();
                image.setImageUrl(imgDTO.getImageUrl());
                image.setStatus(imgDTO.getStatus());
                image.setExperience(experience);
                return image;
            }).collect(Collectors.toList());
            experience.setExperienceImages(images);
        }

        Experience updatedExperience = experienceRepository.save(experience);
        return convertToDTO(updatedExperience);
    }

    @Override
    public void deleteExperience(Integer id) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Experience not found with id: " + id));
        experienceRepository.delete(experience);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExperienceDTO> findByHomestayId(Integer homestayId) {
        return experienceRepository.findByHomestay_HomestayId(homestayId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ExperienceDTO convertToDTO(Experience experience) {
        ExperienceDTO dto = new ExperienceDTO();
        dto.setId(experience.getId());
        dto.setHomestayId(experience.getHomestay().getHomestayId());
        dto.setTypeId(experience.getExperienceType().getId());
        dto.setPrice(experience.getPrice());
        dto.setSpecialNotes(experience.getSpecialNotes());
        dto.setStatus(experience.getStatus());

        if (experience.getExperienceImages() != null) {
            List<ExperienceImageDTO> imageDTOs = experience.getExperienceImages().stream().map(image -> {
                ExperienceImageDTO imgDTO = new ExperienceImageDTO();
                imgDTO.setImageUrl(image.getImageUrl());
                imgDTO.setStatus(image.getStatus());
                return imgDTO;
            }).collect(Collectors.toList());
            dto.setImages(imageDTOs);
        }

        return dto;
    }

    private Experience convertToEntity(ExperienceDTO dto) {
        Experience experience = new Experience();
        experience.setId(dto.getId());
        experience.setPrice(dto.getPrice());
        experience.setSpecialNotes(dto.getSpecialNotes());
        experience.setStatus(dto.getStatus());

        Homestay homestay = homestayRepository.findById(dto.getHomestayId())
                .orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + dto.getHomestayId()));
        experience.setHomestay(homestay);

        ExperienceType experienceType = experienceTypeRepository.findById(dto.getTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("ExperienceType not found with id: " + dto.getTypeId()));
        experience.setExperienceType(experienceType);

        if (dto.getImages() != null) {
            List<ExperienceImage> images = dto.getImages().stream().map(imgDTO -> {
                ExperienceImage image = new ExperienceImage();
                image.setImageUrl(imgDTO.getImageUrl());
                image.setStatus(imgDTO.getStatus());
                image.setExperience(experience);
                return image;
            }).collect(Collectors.toList());
            experience.setExperienceImages(images);
        }

        return experience;
    }
}