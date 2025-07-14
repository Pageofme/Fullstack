package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.ExperienceTypeDTO;
import com.traexcohomestay.hoteltraexco.service.ExperienceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/experience-types")
public class ExperienceTypeController {

    @Autowired
    private ExperienceTypeService experienceTypeService;

    @GetMapping
    public ResponseEntity<List<ExperienceTypeDTO>> getAllExperienceTypes() {
        return ResponseEntity.ok(experienceTypeService.getAllExperienceTypes());
    }
}