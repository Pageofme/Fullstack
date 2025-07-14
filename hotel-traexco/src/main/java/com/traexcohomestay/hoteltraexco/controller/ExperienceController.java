package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.ExperienceDTO;
import com.traexcohomestay.hoteltraexco.service.ExperienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
public class ExperienceController {

    @Autowired
    private ExperienceService experienceService;

    @GetMapping
    public ResponseEntity<List<ExperienceDTO>> getAllExperiences() {
        return ResponseEntity.ok(experienceService.getAllExperiences());
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<ExperienceDTO>> getAllExperiencesPaged(Pageable pageable) {
        return ResponseEntity.ok(experienceService.getAllExperiencesPaged(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExperienceDTO> getExperienceById(@PathVariable Integer id) {
        return ResponseEntity.ok(experienceService.getExperienceById(id));
    }

    @PostMapping
    public ResponseEntity<ExperienceDTO> createExperience(@RequestBody ExperienceDTO experienceDTO) {
        return ResponseEntity.ok(experienceService.createExperience(experienceDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExperienceDTO> updateExperience(@PathVariable Integer id, @RequestBody ExperienceDTO experienceDTO) {
        return ResponseEntity.ok(experienceService.updateExperience(id, experienceDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable Integer id) {
        experienceService.deleteExperience(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/homestay/{homestayId}")
    public ResponseEntity<List<ExperienceDTO>> getExperiencesByHomestayId(@PathVariable Integer homestayId) {
        return ResponseEntity.ok(experienceService.findByHomestayId(homestayId));
    }
}