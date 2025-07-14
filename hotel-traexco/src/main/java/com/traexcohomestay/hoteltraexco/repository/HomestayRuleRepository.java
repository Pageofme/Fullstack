package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.HomestayRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomestayRuleRepository extends JpaRepository<HomestayRule, Integer> {
    List<HomestayRule> findByHomestay_HomestayId(Integer homestayId);
}