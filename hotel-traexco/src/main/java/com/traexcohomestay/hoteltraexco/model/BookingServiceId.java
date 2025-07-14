package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
public class BookingServiceId implements Serializable {
    private static final long serialVersionUID = 4259765468224196271L;

    @Column(name = "booking_id", nullable = false)
    private Integer bookingId;

    @Column(name = "service_id", nullable = false)
    private Integer serviceId;

    // Thêm constructor với tham số
    public BookingServiceId(Integer bookingId, Integer serviceId) {
        this.bookingId = bookingId;
        this.serviceId = serviceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        BookingServiceId entity = (BookingServiceId) o;
        return Objects.equals(this.serviceId, entity.serviceId) &&
                Objects.equals(this.bookingId, entity.bookingId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(serviceId, bookingId);
    }
}