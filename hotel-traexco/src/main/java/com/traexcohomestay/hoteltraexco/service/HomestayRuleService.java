package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.HomestayRuleDTO;
import java.util.List;

public interface HomestayRuleService {
    List<HomestayRuleDTO> getRulesByHomestayId(Integer homestayId);
}