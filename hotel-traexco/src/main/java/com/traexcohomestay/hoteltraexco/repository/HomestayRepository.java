package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.Homestay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface HomestayRepository extends JpaRepository<Homestay, Integer> {
    List<Homestay> findByHomestayNameContainingIgnoreCase(String name);
    List<Homestay> findByLocationContainingIgnoreCase(String location);

}