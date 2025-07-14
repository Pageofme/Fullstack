package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.Booking;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingChartRepository extends CrudRepository<Booking, Integer> {

    @Query("SELECT MONTH(b.checkInDate), SUM(b.totalAmount) FROM Booking b " +
            "GROUP BY MONTH(b.checkInDate) ORDER BY MONTH(b.checkInDate)")
    List<Object[]> getMonthlyRevenue();
    @Query("SELECT MONTH(b.checkInDate), SUM(b.totalAmount) " +
            "FROM Booking b " +
            "WHERE (:year IS NULL OR FUNCTION('YEAR', b.checkInDate) = :year) " +
            "AND (:month IS NULL OR FUNCTION('MONTH', b.checkInDate) = :month) " +
            "GROUP BY MONTH(b.checkInDate) ORDER BY MONTH(b.checkInDate)")
    List<Object[]> getFilteredRevenue(@Param("year") Integer year, @Param("month") Integer month);
}