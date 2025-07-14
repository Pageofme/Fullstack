package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.HomestayRuleDTO;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.model.Homestay;
import com.traexcohomestay.hoteltraexco.model.HomestayRule;
import com.traexcohomestay.hoteltraexco.repository.HomestayRepository;
import com.traexcohomestay.hoteltraexco.repository.HomestayRuleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class HomestayRuleServiceImpl implements HomestayRuleService {

    private static final Logger logger = LoggerFactory.getLogger(HomestayRuleServiceImpl.class);

    @Autowired
    private HomestayRuleRepository homestayRuleRepository;

    @Autowired
    private HomestayRepository homestayRepository;

    @Override
    @Transactional(readOnly = true)
    public List<HomestayRuleDTO> getRulesByHomestayId(Integer homestayId) {
        logger.info("Lấy quy tắc cho homestayId: {}", homestayId);

        // Kiểm tra xem homestay có tồn tại không
        homestayRepository.findById(homestayId)
                .orElseThrow(() -> {
                    logger.error("Không tìm thấy homestay với id: {}", homestayId);
                    return new ResourceNotFoundException("Không tìm thấy homestay với id: " + homestayId);
                });

        List<HomestayRule> rules = homestayRuleRepository.findByHomestay_HomestayId(homestayId);
        if (rules.isEmpty()) {
            logger.warn("Không tìm thấy quy tắc cho homestayId: {}", homestayId);
        }

        return rules.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private HomestayRuleDTO convertToDTO(HomestayRule rule) {
        HomestayRuleDTO dto = new HomestayRuleDTO();
        dto.setRuleId(rule.getId());
        dto.setRuleName(rule.getRuleName());
        dto.setDescription(rule.getDescription());
        dto.setStatus(rule.getStatus());
        return dto;
    }
}