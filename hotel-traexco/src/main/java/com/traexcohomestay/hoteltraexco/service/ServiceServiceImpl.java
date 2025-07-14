package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ServiceDTO;
import com.traexcohomestay.hoteltraexco.dto.ServiceImageDTO;
import com.traexcohomestay.hoteltraexco.dto.ServiceTypeDTO;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.model.Homestay;
import com.traexcohomestay.hoteltraexco.model.ServiceType;
import com.traexcohomestay.hoteltraexco.model.ServiceImage;
import com.traexcohomestay.hoteltraexco.repository.ServiceRepository;
import com.traexcohomestay.hoteltraexco.repository.HomestayRepository;
import com.traexcohomestay.hoteltraexco.repository.ServiceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ServiceServiceImpl implements ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private HomestayRepository homestayRepository;

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ServiceDTO> getAllServices() {
        return serviceRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ServiceDTO> getAllServicesPaged(Pageable pageable) {
        return serviceRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public ServiceDTO getServiceById(Integer id) {
        com.traexcohomestay.hoteltraexco.model.Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
        return convertToDTO(service);
    }

    @Override
    public ServiceDTO createService(ServiceDTO serviceDTO) {
        com.traexcohomestay.hoteltraexco.model.Service service = convertToEntity(serviceDTO);
        com.traexcohomestay.hoteltraexco.model.Service savedService = serviceRepository.save(service);
        return convertToDTO(savedService);
    }

    @Override
    public ServiceDTO updateService(Integer id, ServiceDTO serviceDTO) {
        com.traexcohomestay.hoteltraexco.model.Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));

        service.setPrice(serviceDTO.getPrice());
        service.setSpecialNotes(serviceDTO.getSpecialNotes());
        service.setStatus(serviceDTO.getStatus());

        // Update Homestay
        Homestay homestay = homestayRepository.findById(serviceDTO.getHomestayId())
                .orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + serviceDTO.getHomestayId()));
        service.setHomestay(homestay);

        // Update ServiceType
        ServiceType serviceType = serviceTypeRepository.findById(serviceDTO.getTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("ServiceType not found with id: " + serviceDTO.getTypeId()));
        service.setServiceType(serviceType);

        // Update images
        if (serviceDTO.getImages() != null) {
            service.getImages().clear();
            List<ServiceImage> images = serviceDTO.getImages().stream().map(imgDTO -> {
                ServiceImage image = new ServiceImage();
                image.setImageUrl(imgDTO.getImageUrl());

                image.setStatus(imgDTO.getStatus());
                image.setService(service);
                return image;
            }).collect(Collectors.toList());
            service.setImages(images);
        }

        com.traexcohomestay.hoteltraexco.model.Service updatedService = serviceRepository.save(service);
        return convertToDTO(updatedService);
    }

    @Override
    public void deleteService(Integer id) {
        com.traexcohomestay.hoteltraexco.model.Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
        serviceRepository.delete(service);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServiceDTO> findByHomestayId(Integer homestayId) {
        return serviceRepository.findByHomestay_HomestayId(homestayId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ServiceDTO convertToDTO(com.traexcohomestay.hoteltraexco.model.Service service) {
        ServiceDTO dto = new ServiceDTO();
        dto.setId(service.getId());
        dto.setHomestayId(service.getHomestay().getHomestayId());
        dto.setTypeId(service.getServiceType().getId());
        dto.setPrice(service.getPrice());
        dto.setSpecialNotes(service.getSpecialNotes());
        dto.setStatus(service.getStatus());

        // Convert ServiceType
        if (service.getServiceType() != null) {
            ServiceTypeDTO serviceTypeDTO = new ServiceTypeDTO();
            serviceTypeDTO.setId(service.getServiceType().getId());
            serviceTypeDTO.setServiceName(service.getServiceType().getServiceName());
            serviceTypeDTO.setDescription(service.getServiceType().getDescription());
            serviceTypeDTO.setIconClass(service.getServiceType().getIconClass());
            dto.setServiceType(serviceTypeDTO);
        }

        // Convert images
        if (service.getImages() != null) {
            List<ServiceImageDTO> imageDTOs = service.getImages().stream().map(image -> {
                ServiceImageDTO imgDTO = new ServiceImageDTO();
                imgDTO.setImageUrl(image.getImageUrl());

                imgDTO.setStatus(image.getStatus());
                return imgDTO;
            }).collect(Collectors.toList());
            dto.setImages(imageDTOs);
        }

        return dto;
    }

    private com.traexcohomestay.hoteltraexco.model.Service convertToEntity(ServiceDTO dto) {
        com.traexcohomestay.hoteltraexco.model.Service service = new com.traexcohomestay.hoteltraexco.model.Service();
        service.setPrice(dto.getPrice());
        service.setSpecialNotes(dto.getSpecialNotes());
        service.setStatus(dto.getStatus());

        // Set Homestay
        Homestay homestay = homestayRepository.findById(dto.getHomestayId())
                .orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + dto.getHomestayId()));
        service.setHomestay(homestay);

        // Set ServiceType
        ServiceType serviceType = serviceTypeRepository.findById(dto.getTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("ServiceType not found with id: " + dto.getTypeId()));
        service.setServiceType(serviceType);

        // Set images
        if (dto.getImages() != null) {
            List<ServiceImage> images = dto.getImages().stream().map(imgDTO -> {
                ServiceImage image = new ServiceImage();
                image.setImageUrl(imgDTO.getImageUrl());

                image.setStatus(imgDTO.getStatus());
                image.setService(service);
                return image;
            }).collect(Collectors.toList());
            service.setImages(images);
        }

        return service;
    }
}