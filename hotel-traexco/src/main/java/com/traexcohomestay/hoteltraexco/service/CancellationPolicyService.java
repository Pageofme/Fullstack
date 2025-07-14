package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.CancellationPolicyDTO;

import java.util.List;

public interface CancellationPolicyService {
    List<CancellationPolicyDTO> getPoliciesByHomestay(Integer homestayId);
    CancellationPolicyDTO createPolicy(CancellationPolicyDTO policyDTO);
    CancellationPolicyDTO updatePolicy(Integer policyId, CancellationPolicyDTO policyDTO);
    void deletePolicy(Integer policyId);
}