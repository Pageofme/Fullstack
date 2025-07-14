package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.CancellationPolicyDTO;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.service.CancellationPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cancellation-policies")
public class CancellationPolicyController {

    @Autowired
    private CancellationPolicyService cancellationPolicyService;

    @GetMapping("/homestay/{homestayId}")
    public ResponseEntity<List<CancellationPolicyDTO>> getPoliciesByHomestay(@PathVariable Integer homestayId) {
        List<CancellationPolicyDTO> policies = cancellationPolicyService.getPoliciesByHomestay(homestayId);
        return ResponseEntity.ok(policies);
    }

    @PostMapping
    public ResponseEntity<?> createPolicy(@RequestBody CancellationPolicyDTO policyDTO) {
        try {
            CancellationPolicyDTO createdPolicy = cancellationPolicyService.createPolicy(policyDTO);
            return ResponseEntity.ok(createdPolicy);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{policyId}")
    public ResponseEntity<?> updatePolicy(
            @PathVariable Integer policyId,
            @RequestBody CancellationPolicyDTO policyDTO) {
        try {
            CancellationPolicyDTO updatedPolicy = cancellationPolicyService.updatePolicy(policyId, policyDTO);
            return ResponseEntity.ok(updatedPolicy);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{policyId}")
    public ResponseEntity<?> deletePolicy(@PathVariable Integer policyId) {
        try {
            cancellationPolicyService.deletePolicy(policyId);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}