package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.HomestayDTO;
import com.traexcohomestay.hoteltraexco.dto.HomestayImageDTO;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.model.Homestay;
import com.traexcohomestay.hoteltraexco.model.HomestayImage;
import com.traexcohomestay.hoteltraexco.repository.HomestayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class HomestayServiceImpl implements HomestayService {

    @Autowired
    private HomestayRepository homestayRepository;

    @Override
    @Transactional(readOnly = true)
    public List<HomestayDTO> getAllHomestays() {
        return homestayRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<HomestayDTO> getAllHomestaysPaged(Pageable pageable) {
        return homestayRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public HomestayDTO getHomestayById(Integer id) {
        Homestay homestay = homestayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + id));
        return convertToDTO(homestay);
    }

    @Override
    public HomestayDTO createHomestay(HomestayDTO homestayDTO) {
        Homestay homestay = convertToEntity(homestayDTO);
        Homestay savedHomestay = homestayRepository.save(homestay);
        return convertToDTO(savedHomestay);
    }

    @Override
    public HomestayDTO updateHomestay(Integer id, HomestayDTO homestayDTO) {
        Homestay homestay = homestayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + id));

        homestay.setHomestayName(homestayDTO.getHomestayName());
        homestay.setAddress(homestayDTO.getAddress());
        homestay.setLocation(homestayDTO.getLocation()); // Thêm dòng này
        homestay.setDescription(homestayDTO.getDescription());
        homestay.setHostId(homestayDTO.getHostId());
        homestay.setStatus(homestayDTO.getStatus());

        Homestay updatedHomestay = homestayRepository.save(homestay);
        return convertToDTO(updatedHomestay);
    }

    @Override
    public void deleteHomestay(Integer id) {
        Homestay homestay = homestayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + id));
        homestayRepository.delete(homestay);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HomestayDTO> searchHomestays(String name) {
        return homestayRepository.findByHomestayNameContainingIgnoreCase(name).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    @Override
    @Transactional(readOnly = true)
    public List<HomestayDTO> searchByLocation(String location) {
        return homestayRepository.findByLocationContainingIgnoreCase(location).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private HomestayDTO convertToDTO(Homestay homestay) {
        HomestayDTO dto = new HomestayDTO();
        dto.setId(homestay.getHomestayId());
        dto.setHomestayName(homestay.getHomestayName());
        dto.setAddress(homestay.getAddress());
        dto.setLocation(homestay.getLocation()); // Thêm dòng này
        dto.setDescription(homestay.getDescription());
        dto.setHostId(homestay.getHostId());
        dto.setStatus(homestay.getStatus());

        // Lấy danh sách ảnh
        if (homestay.getImages() != null) {
            List<HomestayImageDTO> imageDTOs = homestay.getImages().stream().map(image -> {
                HomestayImageDTO imgDTO = new HomestayImageDTO();
                imgDTO.setImageUrl(image.getImageUrl());
                imgDTO.setDescription(image.getDescription());
                return imgDTO;
            }).collect(Collectors.toList());
            dto.setImages(imageDTOs);
        }

        return dto;
    }

    private Homestay convertToEntity(HomestayDTO dto) {
        Homestay homestay = new Homestay();
        homestay.setHomestayId(dto.getId());
        homestay.setHomestayName(dto.getHomestayName());
        homestay.setAddress(dto.getAddress());
        homestay.setLocation(dto.getLocation()); // Thêm dòng này
        homestay.setDescription(dto.getDescription());
        homestay.setHostId(dto.getHostId());
        homestay.setStatus(dto.getStatus());
        return homestay;
    }
}