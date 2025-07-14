package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.HomestayDTO;
import com.traexcohomestay.hoteltraexco.service.HomestayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable; // Correct import
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/homestays")
public class HomestayController {

    @Autowired
    private HomestayService homestayService;

    @GetMapping
    public ResponseEntity<List<HomestayDTO>> getAllHomestays() {
        return ResponseEntity.ok(homestayService.getAllHomestays());
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<HomestayDTO>> getAllHomestaysPaged(Pageable pageable) {
        return ResponseEntity.ok(homestayService.getAllHomestaysPaged(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<HomestayDTO> getHomestayById(@PathVariable Integer id) {
        return ResponseEntity.ok(homestayService.getHomestayById(id));
    }

    @PostMapping
    public ResponseEntity<HomestayDTO> createHomestay(@RequestBody HomestayDTO homestayDTO) {
        return ResponseEntity.ok(homestayService.createHomestay(homestayDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HomestayDTO> updateHomestay(@PathVariable Integer id, @RequestBody HomestayDTO homestayDTO) {
        return ResponseEntity.ok(homestayService.updateHomestay(id, homestayDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHomestay(@PathVariable Integer id) {
        homestayService.deleteHomestay(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")  
    public ResponseEntity<List<HomestayDTO>> searchHomestays(@RequestParam String name) {
        return ResponseEntity.ok(homestayService.searchHomestays(name));
    }
    @GetMapping("/location")
    public ResponseEntity<List<HomestayDTO>> getHomestaysByLocation(@RequestParam String location) {
        return ResponseEntity.ok(homestayService.searchByLocation(location));
    }
}