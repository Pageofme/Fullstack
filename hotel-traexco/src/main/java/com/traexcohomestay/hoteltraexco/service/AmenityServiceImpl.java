package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.AmenityDTO;
import com.traexcohomestay.hoteltraexco.model.Amenity;
import com.traexcohomestay.hoteltraexco.repository.AmenityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AmenityServiceImpl implements AmenityService {

    @Autowired
    private AmenityRepository amenityRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AmenityDTO> getAmenitiesByHomestayId(Integer homestayId) {
        List<Amenity> amenities = amenityRepository.findByHomestay_HomestayId(homestayId);
        return amenities.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private AmenityDTO convertToDTO(Amenity amenity) {
        AmenityDTO dto = new AmenityDTO();
        if(amenity.getType() != null) {
            dto.setTypeId(amenity.getType().getId());
            dto.setTypeName(amenity.getType().getTypeName());

            if(amenity.getType().getAmenityIcon() != null) {
                dto.setIconClass(amenity.getType().getAmenityIcon().getIconClass());
            }
        }
        return dto;
    }
}