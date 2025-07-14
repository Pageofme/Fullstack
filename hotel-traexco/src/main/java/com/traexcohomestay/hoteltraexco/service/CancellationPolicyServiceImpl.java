    package com.traexcohomestay.hoteltraexco.service;

    import com.traexcohomestay.hoteltraexco.dto.CancellationPolicyDTO;
    import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
    import com.traexcohomestay.hoteltraexco.model.CancellationPolicy;
    import com.traexcohomestay.hoteltraexco.model.Homestay;
    import com.traexcohomestay.hoteltraexco.repository.CancellationPolicyRepository;
    import com.traexcohomestay.hoteltraexco.repository.HomestayRepository;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;

    import java.util.List;
    import java.util.stream.Collectors;

    @Service
    @Transactional
    public class CancellationPolicyServiceImpl implements CancellationPolicyService {
        private static final Logger logger = LoggerFactory.getLogger(CancellationPolicyServiceImpl.class);

        @Autowired
        private CancellationPolicyRepository cancellationPolicyRepository;

        @Autowired
        private HomestayRepository homestayRepository;

        @Override
        @Transactional(readOnly = true)
        public List<CancellationPolicyDTO> getPoliciesByHomestay(Integer homestayId) {
            logger.info("Fetching cancellation policies for homestayId: {}", homestayId);
            List<CancellationPolicy> policies = cancellationPolicyRepository.findByHomestayId(homestayId);
            return policies.stream().map(this::convertToDTO).collect(Collectors.toList());
        }

        @Override
        public CancellationPolicyDTO createPolicy(CancellationPolicyDTO policyDTO) {
            logger.info("Creating cancellation policy: {}", policyDTO);
            Homestay homestay = homestayRepository.findById(policyDTO.getHomestayId())
                    .orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + policyDTO.getHomestayId()));

            CancellationPolicy policy = new CancellationPolicy();
            policy.setHomestay(homestay);
            policy.setName(policyDTO.getName());
            policy.setDescription(policyDTO.getDescription());
            policy.setRefundPercentage(policyDTO.getRefundPercentage());
            policy.setDaysBeforeCheckin(policyDTO.getDaysBeforeCheckin());

            CancellationPolicy savedPolicy = cancellationPolicyRepository.save(policy);
            return convertToDTO(savedPolicy);
        }

        @Override
        public CancellationPolicyDTO updatePolicy(Integer policyId, CancellationPolicyDTO policyDTO) {
            logger.info("Updating cancellation policy ID: {}", policyId);
            CancellationPolicy policy = cancellationPolicyRepository.findById(policyId)
                    .orElseThrow(() -> new ResourceNotFoundException("Cancellation policy not found with id: " + policyId));

            Homestay homestay = homestayRepository.findById(policyDTO.getHomestayId())
                    .orElseThrow(() -> new ResourceNotFoundException("Homestay not found with id: " + policyDTO.getHomestayId()));

            policy.setHomestay(homestay);
            policy.setName(policyDTO.getName());
            policy.setDescription(policyDTO.getDescription());
            policy.setRefundPercentage(policyDTO.getRefundPercentage());
            policy.setDaysBeforeCheckin(policyDTO.getDaysBeforeCheckin());

            CancellationPolicy updatedPolicy = cancellationPolicyRepository.save(policy);
            return convertToDTO(updatedPolicy);
        }

        @Override
        public void deletePolicy(Integer policyId) {
            logger.info("Deleting cancellation policy ID: {}", policyId);
            CancellationPolicy policy = cancellationPolicyRepository.findById(policyId)
                    .orElseThrow(() -> new ResourceNotFoundException("Cancellation policy not found with id: " + policyId));
            cancellationPolicyRepository.delete(policy);
        }

        private CancellationPolicyDTO convertToDTO(CancellationPolicy policy) {
            CancellationPolicyDTO dto = new CancellationPolicyDTO();
            dto.setId(policy.getId());
            dto.setHomestayId(policy.getHomestay().getHomestayId());
            dto.setName(policy.getName());
            dto.setDescription(policy.getDescription());
            dto.setRefundPercentage(policy.getRefundPercentage());
            dto.setDaysBeforeCheckin(policy.getDaysBeforeCheckin());
            return dto;
        }
    }